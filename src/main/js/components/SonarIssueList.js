/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import ReactModal from 'react-modal';
import MeasuresHistory from "./MeasuresHistory";
import RedmineSettings from "./RedmineSettings";
import {findIssueAndToRedmine, RedmineSettingsAPI, saveSettingToRedmine, settingToRedmineC} from "../api";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default class SonarIssueList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isOpen: false,
            showModal: false,
            settings: [],
            selectProjectValue: {
                id: '',
                value: '',
                label: ''
            },
            selectTrackerValue: {
                id: '',
                value: '',
                label: ''
            },
            selectUserValue: {
                id: '',
                value: '',
                label: ''
            }
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.submitFunction = this.submitFunction.bind(this);
        this.updateProjectValue = this.updateProjectValue.bind(this);
        this.updateTrackerValue = this.updateTrackerValue.bind(this);
        this.updateUserValue = this.updateUserValue.bind(this);
        this.SonarRedminePropertySettings = this.SonarRedminePropertySettings.bind(this);
    }

    handleOpenModal() {
        this.setState({
            showModal: true,
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
        console.log("state : ", this.state.selectProjectValue, this.state.selectTrackerValue, this.state.selectUserValue)
        settingToRedmineC(this.props.project, this.state.selectProjectValue, this.state.selectTrackerValue, this.state.selectUserValue);
        this.handleCloseModal();

    }


    updateProjectValue(e) {
        console.log("updateProjectValue e: ", e);
        this.setState({
            selectProjectValue: e
        })
    };

    updateTrackerValue(e) {
        console.log("updateTrackerValue e: ", e);
        this.setState({
            selectTrackerValue: e
        })
    };

    updateUserValue(e) {
        console.log("updateUserValue e: ", e);
        this.setState({
            selectUserValue: e
        })
    };

    componentDidMount() {
        findIssueAndToRedmine(this.props.project).then(
            (valuesReturnedByAPI) => {
                this.setState({
                    data: valuesReturnedByAPI
                });
            }
        );

        saveSettingToRedmine(this.props.project).then(
            (saveData) => {
                this.SonarRedminePropertySettings(saveData)
            }
        );

        RedmineSettingsAPI().then(
            (settingData) => {
                this.setState({
                    settings: settingData
                });
            }
        );
    }

    SonarRedminePropertySettings(data) {
        console.log("data : ", data);
        console.log("typeopf(data) : ", typeof(data));
        console.log("data.length : ", data.length);
        this.setState({
            selectProjectValue: data,
            selectTrackerValue: data,
            selectUserValue: data
        });
        console.log(this.state.selectProjectValue);
        console.log(this.state.selectTrackerValue);
        console.log(this.state.selectUserValue);
    }


    render() {
        // Data Gathered: {JSON.stringify(this.state.data)}
        return (
            <div className="page page-limited">
                <table className="data zebra">
                    <thead>
                    <tr>
                        <div>
                            <button onClick={this.handleOpenModal}>Settings</button>
                            <ReactModal
                                isOpen={this.state.showModal}
                                style={customStyles}>
                                <div>
                                    <RedmineSettings container={this.state.settings}
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
                    </tr>
                    </thead>
                    <thead>
                    <tr className="code-components-header">
                        <th className="thin nowrap text-center code-components-cell">Severity</th>
                        <th className="thin nowrap text-right code-components-cell">type</th>
                        <th className="thin nowrap text-right code-components-cell">Component</th>
                        <th className="thin nowrap text-left code-components-cell">Line</th>
                        <th className="thin nowrap text-left code-components-cell">message</th>
                        <th className="thin nowrap text-center">To Redmine</th>
                    </tr>
                    </thead>
                    {
                        <tbody>
                        {this.state.data.map(
                            (issues, idx) =>
                                <MeasuresHistory
                                    issue={issues}
                                    key={idx}
                                />
                        )
                        }
                        </tbody>}
                </table>
            </div>
        );
    }
}
