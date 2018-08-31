/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import ReactModal from 'react-modal';
import SonarIssueListUp from "./Sonar-Issue-List-Up";
import RedmineSettings from "./RedmineSettings";
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import {
    RedmineSettingsAPI,
    saveSettingToRedmine,
    settingToRedmineProject,
    settingToRedmineTracker,
    settingToRedmineUser,
    findIssueCodeSmell,
    findIssueBug,
    findIssueVULNERABILITY
} from "../api";

export default class SonarIssueList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bug_data: [],
            code_smell_data: [],
            vulnerability_data: [],
            isOpen: false,
            showModal: false,
            settings: [],
            saveData: [],
            selectProjectValue: {},
            selectTrackerValue: {},
            selectUserValue: {},
            changeProject: false,
            changeTracker: false,
            changeUser: false,
            loading: true
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.updateProjectValue = this.updateProjectValue.bind(this);
        this.updateTrackerValue = this.updateTrackerValue.bind(this);
        this.updateUserValue = this.updateUserValue.bind(this);
    }

    componentDidMount() {
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
    }

    handleOpenModal() {
        this.setState({
            showModal: true,
            selectProjectValue: this.state.saveData[0],
            selectTrackerValue: this.state.saveData[1],
            selectUserValue: this.state.saveData[2]
        });
    }

    handleCloseModal() {
        this.setState({showModal: false});
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

    SeverityIssue(SeveritySelect) {
        return (
            <table className="data zebra">
                <thead>
                <tr className="code-components-header">
                    <th className="thin nowrap text-center code-components-cell">Severity</th>
                    <th className="thin nowrap text-right code-components-cell">Component</th>
                    <th className="thin nowrap text-left code-components-cell">Line</th>
                    <th className="thin nowrap text-left code-components-cell">message</th>
                    <th className="thin nowrap text-center">To Redmine</th>
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
                    <button className="page-actions" onClick={this.handleOpenModal}>Settings</button>
                    <ReactModal
                        isOpen={this.state.showModal}
                        style={{
                            content: {
                                top: '30%',
                                left: '80%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)'
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
                    </TabPanel>
                    <TabPanel>
                        {this.SeverityIssue(this.state.code_smell_data)}
                    </TabPanel>
                    <TabPanel>
                        {this.SeverityIssue(this.state.vulnerability_data)}
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}
