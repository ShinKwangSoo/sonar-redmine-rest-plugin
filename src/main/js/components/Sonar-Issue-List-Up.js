/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import ReactTooltip from 'react-tooltip'
import {IssueToRedmine, TFRedmine, ruleDataRestAPI} from "../api";
import ReactModal from 'react-modal';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

export default class SonarIssueListUp extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            commentData: false,
            succeed: true,
            ruleData: '',
            showModalMessage: false,
            isOpenMessage: false,
            disabled: false
        };
        this.simplification = this.simplification.bind(this);
        this.TFRedmineToSend = this.TFRedmineToSend.bind(this);
        this.Go_Redmine = this.Go_Redmine.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.Go_Redmine_Button = this.Go_Redmine_Button.bind(this);
        this.handleOpenModalMessage = this.handleOpenModalMessage.bind(this);
        this.handleCloseModalMessage = this.handleCloseModalMessage.bind(this);
        this.sonarGoIssue = this.sonarGoIssue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fourceUpdateHandler = this.fourceUpdateHandler.bind(this);
    }

    componentDidMount() {
        TFRedmine(this.props.issue.key).then(
            (commentData) => {
                this.setState({commentData: commentData})
            })
    }

    componentDidUpdate(prevProps) {
        if (this.props.requestState !== prevProps.requestState) {
            if (this.props.requestState === "running") {
                let issue_data = Array.from(this.props.issue_list_tmp);
                if (issue_data.length !== 0) {
                    if (issue_data.filter(issue_data => (issue_data.key === this.props.issue.key)).length !== 0) {
                        this.setState({
                            succeed: false
                        })
                    }
                }
            }
        }
    }

    fourceUpdateHandler() {
        this.forceUpdate();
    }

    onChange(e) {
        console.log(e.target.name);
        let temp_list_data = this.props.issue_list_tmp;
        if (e.target.checked) {
            temp_list_data.add(e.target.name)
        } else {
            temp_list_data.delete(e.target.name)
        }
        this.setState({temp_list_data})
    }


    TFRedmineToSend() {
        if (this.state.commentData === false) {
            let project = this.props.project;
            let issue = this.props.issue;
            let context = this.props.context;
            let hosturl = '';
            if (context[0] === undefined) {
                hosturl = window.location.protocol + '//' + window.location.host;
            } else {
                hosturl = window.location.protocol + '//' + window.location.host + context[0];
            }
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

    sonarGoIssue() {
        let context = this.props.context;
        let hosturl = '';
        let projectkey = this.props.project.key;
        let api = '/project/issues?id=' + projectkey + '&open=' + this.props.issue.key + 'resolved=false&severities=' + this.props.issue.severity + '&types=' + this.props.issue.type;
        if (context[0] === undefined) {
            hosturl = window.location.protocol + '//' + window.location.host + api;
        } else {
            hosturl = window.location.protocol + '//' + window.location.host + context[0] + api;
        }
        window.open(hosturl)
    }

    handleClick() {
        this.setState(previousState => {
            return {
                succeed: !previousState.succeed
            };
        });
    }

    handleOpenModalMessage(rule) {
        ruleDataRestAPI(rule).then((ruleData) => {
            this.setState({
                ruleData: ruleData,
                showModalMessage: true
            });
        })
    }

    handleCloseModalMessage() {
        this.setState({showModalMessage: false});
    }


    Go_Redmine_Button() {
        this.setState({succeed: false});
        let url;
        TFRedmine(this.props.issue.key).then(
            (commentData) => {
                this.setState({
                    commentData: commentData
                });
                url = this.state.commentData;
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
        else return line.substring(0, maxLength) + ('...')
    };

    simplificationlast = (line, maxLength) => {
        if (line === null || line.length <= 60) return line;
        else return "..." + line.substring(maxLength)
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
                <td>
                    <span>
                    <label>
                        <Checkbox
                            name={this.props.issue}
                            onChange={(e) => this.onChange(e)}
                            disabled={this.state.disabled}
                        />
                    </label>
                    </span>
                </td>
                <td className="thin nowrap text-center">
                    <div className="code-components-cell"><span>{this.props.issue.severity}</span></div>
                </td>
                <td className="thin nowrap text-right">
                    <div className="code-components-cell" data-for={this.props.issue.key} data-tip>
                        <span><a href='#'
                                 onClick={this.sonarGoIssue.bind(this)}/>{this.simplificationlast(this.props.issue.component, Math.ceil(this.props.issue.component.length / 4))}</span>
                        <ReactTooltip id={this.props.issue.key} getContent={[() => {
                            return this.props.issue.component
                        }]}/>
                    </div>
                </td>
                <td className="thin nowrap text-left">
                    <div>
                        <span><a href='#'
                                 onClick={event => {
                                     event.preventDefault();
                                     this.handleOpenModalMessage(this.props.issue.rule)
                                 }}>{this.simplification(this.props.issue.message, 30)}</a></span>
                        <ReactModal
                            isOpen={this.state.showModalMessage}
                            style={{
                                content: {
                                    top: '50%',
                                    left: '90%',
                                    right: '50%',
                                    bottom: 'auto',
                                    marginRight: '-50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '60%',
                                    height: '50%',
                                    maxWidth: '40rem',
                                    maxHeight: '40rem',
                                }
                            }}
                        >
                            <div>
                                <table>
                                    <thead>
                                    <th className="thin nowrap text-left">
                                        <div className="workspace-viewer-header">
                                            {this.state.ruleData.name}</div>
                                    </th>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th className="thin nowrap text-left">
                                            <div className="coding-rules-detail-description rule-desc markdown"
                                                 dangerouslySetInnerHTML={{__html: this.state.ruleData.htmlDesc || ''}}>
                                            </div>

                                        </th>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button onClick={this.handleCloseModalMessage}>Close</button>
                        </ReactModal>
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
