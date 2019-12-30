/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import ReactModal from 'react-modal';
import SonarIssueListUp from "./Sonar-Issue-List-Up";
import RedmineSettings from "./RedmineSettings";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {
    findIssue_NextPage,
    findIssueBug,
    findIssueCODE_SMELL_NextPage,
    findIssueCodeSmell,
    findIssueVULNERABILITY,
    RedmineSettingsAPI,
    saveSettingToRedmine, SelectedIssueToRedmine,
    settingToRedmineProject,
    settingToRedmineTracker,
    settingToRedmineUser,
    SonarHostURL, UserSyncRestAPI
} from "../api";
import '../common/SonarRedmine.css'
import CheckListToRedmine from "./CheckListToRedmine";

export default class SonarIssueList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bug_data: [],
            code_smell_data: [],
            vulnerability_data: [],
            isOpen: false,
            showModal: false,
            showModal2: false,
            settings: [],
            saveData: [],
            selectProjectValue: {},
            selectTrackerValue: {},
            selectUserValue: {},
            changeProject: false,
            changeTracker: false,
            changeUser: false,
            loading: false,
            context: null,
            bug_data_paging: 2,
            code_smell_paging: 2,
            vulnerability_paging: 2,
            issue_list_tmp: new Set(),
            requestState: null

        }
        ;
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleOpenModalToSetting = this.handleOpenModalToSetting.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseModal2 = this.handleCloseModal2.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.updateProjectValue = this.updateProjectValue.bind(this);
        this.updateTrackerValue = this.updateTrackerValue.bind(this);
        this.updateUserValue = this.updateUserValue.bind(this);
        this.showMoreBugList = this.showMoreBugList.bind(this);
        this.showMoreCodeSmellList = this.showMoreCodeSmellList.bind(this);
        this.showMoreVulList = this.showMoreVulList.bind(this);
        this.ToRedmineFunction = this.ToRedmineFunction.bind(this);
        this.RedmineUserCallOnSonarSetting=this.RedmineUserCallOnSonarSetting.bind(this)
    }

    componentDidMount() {
        console.log("react version : ", React.version);
        findIssueBug(this.props.project).then(
            (valuesReturnedByAPI) => {
                this.setState({
                    bug_data: valuesReturnedByAPI
                });
            }
        );

        findIssueCodeSmell(this.props.project).then(
            (valuesReturnedByAPI) => {
                this.setState({
                    code_smell_data: valuesReturnedByAPI
                });
            }
        );

        findIssueVULNERABILITY(this.props.project).then(
            (valuesReturnedByAPI) => {
                this.setState({
                    vulnerability_data: valuesReturnedByAPI
                });
            }
        );

        saveSettingToRedmine(this.props.project).then(
            (saveData) => {
                this.setState({
                    saveData: saveData
                })
            }
        );

        RedmineSettingsAPI().then(
            (settingData) => {
                this.setState({
                    settings: settingData,
                    loading: false
                });
            }
        );
        SonarHostURL().then(
            (hostURL) => {
                this.setState({
                    context: hostURL
                })
            });
    }

    handleOpenModal() {
        this.setState({
            showModal: true,
            selectProjectValue: this.state.saveData[0],
            selectTrackerValue: this.state.saveData[1],
            selectUserValue: this.state.saveData[2]
        });
    }

    handleOpenModalToSetting() {
        this.setState({
            showModal2: true,
            requestState: "pending",
            selectUserValue: this.state.saveData[2]
        });
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    handleCloseModal2() {
        this.setState({showModal2: false});
    }

    RedmineUserCallOnSonarSetting() {
        UserSyncRestAPI(this.props.project);
    }


    submitFunction() {
        this.setState({
            selectProjectValue: this.state.selectProjectValue,
            selectTrackerValue: this.state.selectTrackerValue,
            selectUserValue: this.state.selectUserValue
        });
        if (this.state.changeProject === true) {
            settingToRedmineProject(this.props.project, this.state.selectProjectValue);
            this.setState({
                changeProject: false
            })
        }
        if (this.state.changeTracker === true) {
            settingToRedmineTracker(this.props.project, this.state.selectTrackerValue);
            this.setState({
                changeTracker: false
            })
        }
        if (this.state.changeUser === true) {
            settingToRedmineUser(this.props.project, this.state.selectUserValue);
            this.setState({
                changeUser: false
            })
        }
        this.handleCloseModal();
        window.location.reload();
    }

    updateProjectValue(e) {
        console.log("updateProjectValue e: ", e);
        this.setState({
            selectProjectValue: e,
            changeProject: true
        })
    };

    updateTrackerValue(e) {
        console.log("updateTrackerValue e: ", e);
        this.setState({
            selectTrackerValue: e,
            changeTracker: true
        })
    };

    updateUserValue(e) {
        console.log("updateUserValue e: ", e);
        this.setState({
            selectUserValue: e,
            changeUser: true
        })
    };

    showMoreBugList() {
        findIssue_NextPage(this.props.project, this.state.bug_data_paging, "BUG").then(
            (valuesReturnedByAPI) => {
                this.setState({
                    bug_data: this.state.bug_data.concat(valuesReturnedByAPI),
                    bug_data_paging: this.state.bug_data_paging + 1
                });
            }
        )
    }

    showMoreCodeSmellList() {
        findIssueCODE_SMELL_NextPage(this.props.project, this.state.code_smell_paging).then(
            (valuesReturnedByAPI) => {
                this.setState({
                    code_smell_data: this.state.code_smell_data.concat(valuesReturnedByAPI),
                    code_smell_paging: this.state.code_smell_paging + 1
                });
            }
        )
    }

    showMoreVulList() {
        findIssue_NextPage(this.props.project, this.state.vulnerability_paging, "VULNERABILITY").then(
            (valuesReturnedByAPI) => {
                this.setState({
                    vulnerability_data: this.state.vulnerability_data.concat(valuesReturnedByAPI),
                    vulnerability_paging: this.state.vulnerability_paging + 1
                });
            }
        )
    }

    ToRedmineFunction() {
        let context = this.state.context;
        let hosturl = '';
        if (context[0] === undefined) {
            hosturl = window.location.protocol + '//' + window.location.host;
        } else {
            hosturl = window.location.protocol + '//' + window.location.host + context[0];
        }
        let issue_data = Array.from(this.state.issue_list_tmp);
        let user = this.state.selectUserValue;
        if (typeof user === "object") {
            user = this.state.selectUserValue.id;
        }
        for (let i = 0; i < issue_data.length; i++) {
            SelectedIssueToRedmine(this.props.project, issue_data[i], hosturl, user);
            if (issue_data.length - 1 === i) {
                this.setState({
                    requestState: "running",
                })
            }
        }
        this.handleCloseModal2();
    }

    SeverityIssue(SeveritySelect) {
        return (
            <table className="data zebra" >
                <thead>
                <tr className="code-components-header">
                    <th className="code-components-cell check-box-font-size"/>
                    <th className="nowrap text-center code-components-cell">Severity</th>
                    <th className="nowrap text-right code-components-cell">Component</th>
                    <th className="nowrap text-right code-components-cell">Author</th>
                    <th className="nowrap text-left code-components-cell">message</th>
                    <th className="nowrap text-center">To Redmine</th>
                </tr>
                </thead>
                {
                    <tbody>
                    {SeveritySelect.map(
                        (issues, idx) =>
                            <SonarIssueListUp
                                project={this.props.project}
                                issue={issues}
                                key={idx}
                                context={this.state.context}
                                issue_list_tmp={this.state.issue_list_tmp}
                                requestState={this.state.requestState}
                            />
                    )
                    }
                    </tbody>}
            </table>
        )
    }

    render() {
        return (
            <div className="code-components-cell">
                <div>
                    <button className="page-actions" onClick={this.RedmineUserCallOnSonarSetting}>User Sync</button>
                </div>
                <div>
                    <button className="page-actions" onClick={this.handleOpenModalToSetting}
                            disabled={this.state.loading}>Select ToRedmine
                    </button>
                    <ReactModal
                        isOpen={this.state.showModal2}
                        style={{
                            content: {
                                top: '30%',
                                left: '80%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                border: '1px solid',
                                backgroundColor: 'white'
                            }
                        }}>
                        <div>
                            <CheckListToRedmine container={this.state.settings}
                                                userDefault={this.state.selectUserValue}
                                                userValue={this.updateUserValue}
                                                issue_list_tmp={this.state.issue_list_tmp}
                            />
                        </div>
                        <button onClick={this.ToRedmineFunction}>ToRedmine</button>
                        <button onClick={this.handleCloseModal2}>Close</button>
                    </ReactModal>
                </div>
                <div>
                    <button className="page-actions" onClick={this.handleOpenModal}
                            disabled={this.state.loading}>Settings
                    </button>
                    <ReactModal
                        isOpen={this.state.showModal}
                        style={{
                            content: {
                                top: '30%',
                                left: '80%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                border: '1px solid',
                                backgroundColor: 'white'
                            }
                        }}>
                        <div>
                            <RedmineSettings saveData={this.state.saveData}
                                             container={this.state.settings}
                                             projectDefault={this.state.selectProjectValue}
                                             trackerDefault={this.state.selectTrackerValue}
                                             userDefault={this.state.selectUserValue}
                                             projectValue={this.updateProjectValue}
                                             trackerValue={this.updateTrackerValue}
                                             userValue={this.updateUserValue}
                            />
                        </div>
                        <button onClick={this.submitFunction}>Save</button>
                        <button onClick={this.handleCloseModal}>Close</button>
                    </ReactModal>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>BUG</Tab>
                        <Tab>Code Smell</Tab>
                        <Tab>VULNERABILITY</Tab>
                    </TabList>
                    <TabPanel>
                        {this.SeverityIssue(this.state.bug_data)}
                        <footer className="spacer-top note text-center">
                            <a onClick={this.showMoreBugList}>Show More</a>
                        </footer>
                    </TabPanel>
                    <TabPanel>
                        {this.SeverityIssue(this.state.code_smell_data)}
                        <footer className="spacer-top note text-center">
                            <a onClick={this.showMoreCodeSmellList}>Show More</a>
                        </footer>
                    </TabPanel>
                    <TabPanel>
                        {this.SeverityIssue(this.state.vulnerability_data)}
                        <footer className="spacer-top note text-center">
                            <a onClick={this.showMoreVulList}>Show More</a>
                        </footer>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }


}
