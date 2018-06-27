/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import ReactTooltip from 'react-tooltip'
import {findIssueAndToRedmine} from "../api";

export default class MeasuresHistory extends React.PureComponent {
    constructor(props){
        super();
        this.IssueToRedmine=this.IssueToRedmine.bind(this);
    }

    IssueToRedmine(){
        return getJSON('/api/settings/values', {
            keys: "sonar.redmine.hosturl,sonar.redmine.api-access-key"
        }).then(function (redmine_access) {
            return getJSON()

        })
    }

    simplification = (line, maxLength) => {
        if (line === null || line.length <= maxLength) return line;
        else return line.substring(0, maxLength)
    }

    render() {
        return (
            <tr>
                <td className="thin nowrap text-center">
                    <div className="code-components-cell"><span>{this.props.issue.severity}</span></div>
                </td>
                <td className="thin nowrap text-right">
                    <div className="code-components-cell"><span>{this.props.issue.type}</span></div>
                </td>
                <td className="thin nowrap text-right">
                    <div className="code-components-cell"><span>{this.props.issue.component}</span></div>
                </td>
                <td className="thin nowrap text-left">
                    <div className="code-components-cell"><span>{this.props.issue.line}</span></div>
                </td>
                <td className="thin nowrap text-left">
                    <div className="code-components-cell">
                        <span><a data-tip data-for="toggler">{this.simplification(this.props.issue.message, 20)}</a>
                            <ReactTooltip id="toggler" getContent={[() => {return this.props.issue.message}]}></ReactTooltip>
                        </span>
                    </div>
                </td>
                <td className="thin nowrap text-center">
                    <div className="code-components-cell">
                        <span>
                        <button onClick={this.IssueToRedmine}>
                            To_Redmine
                        </button>
                    </span>
                    </div>
                </td>
            </tr>
        );
    }


}
