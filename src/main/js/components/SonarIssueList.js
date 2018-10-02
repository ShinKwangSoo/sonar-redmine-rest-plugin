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
const labelStyle = {
    width:"150",
    height:"10",
    minWidth: "10",

};
import {
    RedmineSettingsAPI,
    saveSettingToRedmine,
    settingToRedmineProject,
    settingToRedmineTracker,
    settingToRedmineUser,
    findIssueCodeSmell,
    findIssueBug,
    findIssueVULNERABILITY,
    SonarHostURL, findIssue_NextPage, findIssueCODE_SMELL_NextPage, RedmineUserList
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
            loading: true,
            context: null,
            bug_data_paging:2,
            code_smell_paging:2,
            vulnerability_paging:2
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.updateProjectValue = this.updateProjectValue.bind(this);
        this.updateTrackerValue = this.updateTrackerValue.bind(this);
        this.updateUserValue = this.updateUserValue.bind(this);
        this.showMoreBugList = this.showMoreBugList.bind(this);
        this.showMoreCodeSmellList = this.showMoreCodeSmellList.bind(this);
        this.showMoreVulList = this.showMoreVulList.bind(this);
        this.ToRedmineUserList=this.ToRedmineUserList.bind(this);
        this.ToRedmineFunction=this.ToRedmineFunction.bind(this);
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

    showMoreBugList() {
        findIssue_NextPage(this.props.project, this.state.bug_data_paging,"BUG").then(
            (valuesReturnedByAPI) => {
                this.setState({
                    bug_data: this.state.bug_data.concat(valuesReturnedByAPI),
                    bug_data_paging: this.state.bug_data_paging+1
                });
            }
        )
    }

    showMoreCodeSmellList() {
        findIssueCODE_SMELL_NextPage(this.props.project, this.state.code_smell_paging).then(
            (valuesReturnedByAPI) => {
                this.setState({
                    code_smell_data: this.state.code_smell_data.concat(valuesReturnedByAPI),
                    code_smell_paging: this.state.code_smell_paging+1
                });
            }
        )
    }
    showMoreVulList() {
        findIssue_NextPage(this.props.project, this.state.vulnerability_paging,"VULNERABILITY").then(
            (valuesReturnedByAPI) => {
                this.setState({
                    vulnerability_data: this.state.vulnerability_data.concat(valuesReturnedByAPI),
                    vulnerability_paging: this.state.vulnerability_paging+1
                });
            }
        )
    }

    SeverityIssue(SeveritySelect) {
        return (
            <table className="data zebra">
                <thead>
                <tr className="code-components-header">
                    <th className="thin nowrap text-center code-components-cell">Severity</th>
                    <th className="thin nowrap text-right code-components-cell">Component</th>
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
                                context={this.state.context}
                            />
                    )
                    }
                    </tbody>}
            </table>
        )
    }

    ToRedmineFunction(){

    }


    ToRedmineUserList() {
        let redmineprojectName = [];
        for (let i = 0, redmineprojectNumber = 0; i < this.state.settings[2].length; i++) {
            let result = {
                value: this.state.settings[2][i].id,
                label: this.state.settings[2][i].firstname,
                id: this.state.settings[2][i].id
            };
            redmineprojectName[redmineprojectNumber] = result;
            redmineprojectNumber++;
        }
        return redmineprojectName;
    }

    render() {
        return (
            <div className="code-components-cell">
                <div>
                    <button className="page-actions" onClick={this.handleOpenModal}>Test</button>
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
                           <table>
                               <tr>
                                   <th>
                                       <div className="code-components-cell"><span><h3>Redmine Users : </h3></span></div>
                                   </th>
                                   <th>
                                       <div className="selection">
                                           <Select id="users-select"
                                                   name="users-select"
                                                   style={labelStyle}
                                                   options={this.ToRedmineUserList}
                                                   value={this.state.selectUserValue}
                                                   searchable={true}
                                                   simpleValue
                                                   autoFocus={true}
                                                   clearable={false}
                                                   onChange={this.updateUserValue}
                                           />
                                       </div>
                                   </th>
                               </tr>
                           </table>
                        </div>
                        <button onClick={this.ToRedmineFunction}>ToRedmine</button>
                        <button onClick={this.handleCloseModal}>Close</button>
                    </ReactModal>
                </div>
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
                        <button className="spacer-top note text-center" onClick={this.showMoreBugList}>Show More</button>
                    </TabPanel>
                    <TabPanel>
                        {this.SeverityIssue(this.state.code_smell_data)}
                        <button className="spacer-top note text-center" onClick={this.showMoreCodeSmellList}>Show More</button>
                    </TabPanel>
                    <TabPanel>
                        {this.SeverityIssue(this.state.vulnerability_data)}
                        <button className="spacer-top note text-center" onClick={this.showMoreVulList}>Show More</button>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}
