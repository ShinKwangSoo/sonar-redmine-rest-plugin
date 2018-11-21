/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import ReactTooltip from 'react-tooltip'
import {
    IssueToRedmine,
    TFRedmine,
    ruleDataRestAPI, SonarSourceViewAPI, SonarSourceDataMoreLoad,
} from "../api";
import SonarSourceViewModal from "./SonarSourceViewModal";
import ReactModal from 'react-modal';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import '../common/SonarRedmine.css'

export default class SonarIssueListUp extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            commentData: false,
            succeed: true,
            ruleData: '',
            showModalMessage: false,
            isOpenMessage: false,
            checkTF: false,
            showModalComponent: false,
            hosturl: '',
            sourceData: '',
            sourceDataMore: 2001
        };
        this.simplification = this.simplification.bind(this);
        this.TFRedmineToSend = this.TFRedmineToSend.bind(this);
        this.Go_Redmine = this.Go_Redmine.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.Go_Redmine_Button = this.Go_Redmine_Button.bind(this);
        this.handleOpenModalMessage = this.handleOpenModalMessage.bind(this);
        this.handleCloseModalMessage = this.handleCloseModalMessage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleOpenModalComponent = this.handleOpenModalComponent.bind(this);
        this.handleCloseModalComponent = this.handleCloseModalComponent.bind(this);
        this.LoadMoreCode = this.LoadMoreCode.bind(this);
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
                            succeed: false,
                            checkTF: false
                        });
                    }
                }
            }
        }
    }

    onChange(e) {
        console.log(e.target.name);
        let temp_list_data = this.props.issue_list_tmp;
        console.log("e : ", e);
        console.log("e.target : ", e.target);
        if (e.target.checked) {
            temp_list_data.add(e.target.name);
            this.setState({
                checkTF: e.target.checked
            });
        } else {
            this.setState({
                checkTF: e.target.checked
            });
            temp_list_data.delete(e.target.name)
        }
        this.setState({
            temp_list_data,
        })
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

    handleOpenModalComponent(component, e) {
        SonarSourceViewAPI(component).then(
            (sourceData) => {
                this.setState({
                    sourceData: sourceData,
                    showModalComponent: true
                });
            });
    }

    LoadMoreCode() {
        SonarSourceDataMoreLoad(this.props.issue.component, this.state.sourceDataMore).then(
            (valuesReturnedByAPI) => {
                this.setState({
                    sourceData: this.state.sourceData.concat(valuesReturnedByAPI),
                    sourceDataMore: this.state.sourceDataMore + 2000
                });
            }
        );
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

    handleCloseModalComponent() {
        this.setState({
            showModalComponent: false
        })
    }

    Go_Redmine_Button() {
        this.setState({succeed: false});
        let url;
        TFRedmine(this.props.issue.key).then((commentData) => {
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
                <td className="nowrap text-right code-components-cell check-box-font-size">
                    <span>
                    <label>
                        <Checkbox
                            className="center-pill"
                            name={this.props.issue}
                            checked={this.state.checkTF}
                            onChange={(e) => this.onChange(e)}
                        />
                    </label>
                    </span>
                </td>
                <td className="nowrap text-center">
                    <div className="code-components-cell"><span>{this.props.issue.severity}</span></div>
                </td>
                <td className="nowrap text-right">
                    <div className="code-components-cell" data-for={this.props.issue.key} data-tip>
                        <span><a href='#' onClick={e => {
                            e.preventDefault();
                            this.handleOpenModalComponent(this.props.issue.component, e)
                        }}>{this.simplificationlast(this.props.issue.component, Math.ceil(this.props.issue.component.length / 4))}</a></span>
                        <ReactTooltip id={this.props.issue.key} getContent={[() => {
                            return this.props.issue.component
                        }]}/>
                        <ReactModal isOpen={this.state.showModalComponent}
                                    onRequestClose={this.handleCloseModalComponent}
                                    shouldCloseOnOverlayClick={true}
                                    style={{
                                        content: {
                                            position: '',
                                            top: '50%',
                                            left: '70%',
                                            right: '50%',
                                            bottom: 'auto',
                                            marginRight: '-50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '60%',
                                            height: '50%',
                                            maxWidth: '100rem',
                                            maxHeight: '40rem',
                                        }
                                    }}>
                            <div>
                                <SonarSourceViewModal issue={this.props.issue}
                                                      sourceData={this.state.sourceData}
                                                      LoadMoreCode={this.LoadMoreCode}
                                                      handleOpenModalMessage={this.handleOpenModalMessage}
                                />
                            </div>
                        </ReactModal>
                    </div>
                </td>
                <td className="nowrap text-left">
                    <div>
                        <span><a href='#'
                                 onClick={e => {
                                     e.preventDefault();
                                     this.handleOpenModalMessage(this.props.issue.rule, e)
                                 }}>{this.simplification(this.props.issue.message, 30)}</a></span>
                        <ReactModal
                            isOpen={this.state.showModalMessage}
                            onRequestClose={this.handleCloseModalMessage}
                            shouldCloseOnOverlayClick={true}
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
                                    <tr>
                                        <div className="rule-message">{this.props.issue.message}</div>
                                    </tr>
                                    <tr className="nowrap text-left">
                                        <div className="workspace-viewer-header">
                                            {this.state.ruleData.name}</div>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th className="nowrap text-left">
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
                <td className="nowrap text-center">
                    <div className="code-components-cell" onClick={this.handleClick.bind(this)}>
                        {this.state.succeed ? succeed : notsucceed}
                    </div>
                </td>
            </tr>
        );
    }
}
