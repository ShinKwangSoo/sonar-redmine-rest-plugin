/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import MeasuresHistory from "./MeasuresHistory";
import {findVersionsAndMeasures} from '../api.js'
import {findIssueAndToRedmine} from "../api";

export default class SonarIssueList extends React.PureComponent {

    state = {
        data: []
    };

    componentDidMount() {
        findIssueAndToRedmine(this.props.project).then(
            (valuesReturnedByAPI) => {
                this.setState({
                    data: valuesReturnedByAPI
                });
            }
        );
    }
    /*componentDidMount() {
        findVersionsAndMeasures(this.props.project).then(
            (valuesReturnedByAPI) => {
                this.setState({
                    data: valuesReturnedByAPI
                });
            }
        );
    }*/
    render() {
        // Data Gathered: {JSON.stringify(this.state.data)}
        return (
            <div className="page page-limited">
                <table className="data zebra">
                    <thead><tr className="code-components-header">
                        <th className="thin nowrap text-center code-components-cell">Severity</th>
                        <th className="thin nowrap text-right code-components-cell">type</th>
                        <th className="thin nowrap text-right code-components-cell">Component</th>
                        <th className="thin nowrap text-left code-components-cell">Line</th>
                        <th className="thin nowrap text-left code-components-cell">message</th>
                        <th className="thin nowrap text-center">To Redmine</th>
                    </tr></thead>{
                    <tbody>
                    {this.state.data.map(
                        (issues,idx) =>
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
