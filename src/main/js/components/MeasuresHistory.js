/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import {UncontrolledCollapse,Button, CardBody, Card} from 'reactstrap'

export default class MeasuresHistory extends React.PureComponent {

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
                <td className="thin nowrap text-right">
                    <div className="code-components-cell"><span>{this.props.issue.line}</span></div>
                </td>
                <td className="thin nowrap text-left">
                    <div className="code-components-cell">
                        <span><href {this.simplification(this.props.issue.message, 20)}</span></div>
                </td>
                <td className="thin nowrap text-center">
                    <div className="code-components-cell"><span>To Redmine</span></div>
                </td>
            </tr>
        );
    }


}
