import React from "react";
import Select from 'react-select';
import "../common/SonarRedmine.css"

const labelStyle = {
    width: "150",
    height: "10",
    minWidth: "10",

};

export default class IssueSenderSettingRedmineUser extends React.Component {
    constructor(props) {
        super(props);
        this.IssueSenderSettingRedmineUser = this.IssueSenderSettingRedmineUser.bind(this);
    }

    IssueSenderSettingRedmineUser() {
        let redmineProjectName = [];
        for (let i = 0, redmineProjectNumber = 0; i < this.props.container[2].length; i++) {
            redmineProjectName[redmineProjectNumber] = {
                value: this.props.container[2][i].id,
                label: this.props.container[2][i].firstname,
                id: this.props.container[2][i].id
            };
            redmineProjectNumber++;
        }
        return redmineProjectName;
    }

    render() {
        return (
            <table>
                <tr>
                    <th>
                        <div>
                            <p>
                            <label>Do you want to assign count  </label>
                            <label className="issue-count-css">{this.props.issue_list_tmp.size}</label>
                            <label>  to the following users?</label>
                            </p>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th>
                        <span className="code-components-cell"><h3>Redmine User : </h3></span>
                    </th>
                    <th>
                            <Select id="user-select"
                                    className="selection"
                                    name="user-select"
                                    style={labelStyle}
                                    options={this.RedmineUserList()}
                                    searchable={true}
                                    value={this.props.userDefault}
                                    simpleValue
                                    autoFocus={true}
                                    clearable={false}
                                    onChange={this.props.userValue}
                            />
                    </th>
                </tr>
            </table>
        );
    }
}
