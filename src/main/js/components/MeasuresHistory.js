/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import ReactTooltip from 'react-tooltip'
import {IssueToRedmine,TFRedmine} from "../api";

export default class MeasuresHistory extends React.PureComponent {
    constructor(props) {
        super(props);
        this.simplification=this.simplification.bind(this);
        this.TFRedmineToSend=this.TFRedmineToSend.bind(this);
    }

    TFRedmineToSend(){
        if(TFRedmine(this.props.issue.key)===false) {
            <button onClick={IssueToRedmine(this.props.issue.key, this.props.issue.rule, this.props.issue.message)}>
                To_Redmine
            </button>
        }else {
            console.log(TFRedmine(this.props.issue.key))
        }
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
                    <div>
                        <span><a data-tip data-for="getConent">{this.simplification(this.props.issue.message, 20)}</a>
                            <ReactTooltip id="toggler" getContent={[() => {
                                return this.props.issue.message
                            }]}></ReactTooltip>
                        </span>
                    </div>
                </td>
                <td className="thin nowrap text-center">
                    <div className="code-components-cell">
                        <span>
                            {this.TFRedmineToSend()}
                    </span>
                    </div>
                </td>
            </tr>
        );
    }
}
