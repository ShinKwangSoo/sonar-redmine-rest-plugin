/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import ReactTooltip from 'react-tooltip'
import {IssueToRedmine, TFRedmine} from "../api";

export default class SonarIssueListUp extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            commentData: false,
            succeed: true
        };
        this.simplification = this.simplification.bind(this);
        this.TFRedmineToSend = this.TFRedmineToSend.bind(this);
        this.Go_Redmine = this.Go_Redmine.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.Go_Redmine_Button = this.Go_Redmine_Button.bind(this);
    }

    componentDidMount() {
        TFRedmine(this.props.issue.key).then(
            (commentData) => {
                this.setState({commentData: commentData})
            })
    }

    TFRedmineToSend() {
        if (this.state.commentData === false) {
            let project = this.props.project;
            let issue=this.props.issue
            let hosturl = window.location.host;
            return (
                <span>
                <button onClick={function () {
                    IssueToRedmine(project, issue, hosturl);
                }}>To_Redmine
                </button>
                </span>
            );
        } else {
            this.setState({succeed: false});
            this.Go_Redmine()
        }
    }

    handleClick() {
        this.setState(previousState => {
            return {
                succeed: !previousState.succeed
            };
        });
    }

    Go_Redmine_Button() {
        this.setState({succeed: false});
        var url;
        TFRedmine(this.props.issue.key).then(
            (commentData) => {
                this.setState({
                    commentData: commentData
                });
                url = this.state.commentData;
                console.log("url : ",url)
                window.open(url)
            });
    }

    Go_Redmine() {
        return (
            <span>
            <button onClick={
                () => this.Go_Redmine_Button()
            }>
                Go_Redmine
            </button>
            </span>);
    }

    simplification = (line, maxLength) => {
        if (line === null || line.length <= maxLength) return line;
        else return line.substring(0, maxLength)
    };


    render() {
        const succeed = (
            this.TFRedmineToSend()
        );
        const notsucceed = (
            this.Go_Redmine()
        );
        return (
            <tr>
                <td className="thin nowrap text-center">
                    <div className="code-components-cell"><span>{this.props.issue.severity}</span></div>
                </td>
                <td className="thin nowrap text-right">
                    <div className="code-components-cell"><span>{this.props.issue.component}</span></div>
                </td>
                <td className="thin nowrap text-left">
                    <div className="code-components-cell"><span>{this.props.issue.line}</span></div>
                </td>
                <td className="thin nowrap text-left">
                    <div>
                        <span><a data-tip data-for="getConent">{this.simplification(this.props.issue.message, 20)}</a>
                            <ReactTooltip id="toggler" getContent={[() => {
                                return this.props.issue.message
                            }]}></ReactTooltip>
                        </span>
                    </div>
                </td>
                <td className="thin nowrap text-center">
                    <div className="code-components-cell" onClick={this.handleClick.bind(this)}>
                        {this.state.succeed ? succeed : notsucceed}
                    </div>
                </td>
            </tr>

        );
    }
}
