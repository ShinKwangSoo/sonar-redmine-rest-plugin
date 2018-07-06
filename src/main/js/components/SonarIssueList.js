/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import ReactModal from 'react-modal';
import MeasuresHistory from "./MeasuresHistory";
import RedmineSettings from "./RedmineSettings";
import {findIssueAndToRedmine, RedmineSettingsAPI} from "../api";

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
    constructor() {
        super();
        this.state = {
            data: [],
            isOpen: false,
            showModal: false,
            settings: []
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    componentDidMount() {
        findIssueAndToRedmine(this.props.project).then(
            (valuesReturnedByAPI) => {
                this.setState({
                    data: valuesReturnedByAPI
                });
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
                                    <RedmineSettings container={this.state.settings}/>
                                 </div>
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
