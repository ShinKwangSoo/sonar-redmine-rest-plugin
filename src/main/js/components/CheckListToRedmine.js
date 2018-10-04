import React from "react";
import Select from 'react-select';

const labelStyle = {
    width:"150",
    height:"10",
    minWidth: "10",

};

export default class CheckListToRedmine extends React.Component {
    constructor(props) {
        super(props);
         this.RedmineUserList = this.RedmineUserList.bind(this);
    }

    RedmineUserList() {
        let redmineprojectName = [];
        for (let i = 0, redmineprojectNumber = 0; i < this.props.container[2].length; i++) {
            let result = {
                value: this.props.container[2][i].id,
                label: this.props.container[2][i].firstname,
                id: this.props.container[2][i].id
            };
            redmineprojectName[redmineprojectNumber] = result;
            redmineprojectNumber++;
        }
        return redmineprojectName;
    }

    render() {
        return (
            <table>
                <tr>
                    <th>
                        <div className="code-components-cell"><span><h3>Redmine Projects : </h3></span></div>
                    </th>
                    <th>
                        <span className="selection">
                            <Select id="project-select"
                                    name="project-select"
                                    style={labelStyle}
                                    options={this.RedmineUserList()}
                                    searchable={true}
                                    value={this.props.userDefault}
                                    simpleValue
                                    autoFocus={true}
                                    clearable={false}
                                    onChange={this.props.userValue}
                            />
                        </span>
                    </th>
                </tr>
            </table>
        );
    }
}
