/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';

export default class MeasuresHistory extends React.PureComponent {

  render() {
    return (
      <tr>
        <td className="code-name-cell">{this.props.issue.key}</td>
        <td className="thin nowrap text-center"><div className="code-components-cell"><span>{this.props.issue.severity}</span></div></td>
        <td className="thin nowrap text-right"><div className="code-components-cell"><span>{this.props.issue.rule}</span></div></td>
        <td className="thin nowrap text-right"><div className="code-components-cell"><span>{this.props.issue.component}</span></div></td>
        <td className="thin nowrap text-right"><div className="code-components-cell"><span>{this.props.issue.line}</span></div></td>
        <td className="thin nowrap text-right"><div className="code-components-cell"><span>{this.props.issue.message}</span></div></td>
        <td className="thin nowrap text-right"><div className="code-components-cell"><span>{this.props.issue.type}</span></div></td>
        <td className="thin nowrap text-right"><div className="code-components-cell"><span>{this.props.issue.type}</span></div></td>
      </tr>
    );
  }
}
