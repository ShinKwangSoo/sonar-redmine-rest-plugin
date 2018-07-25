import React from "react";
import Select from 'react-select';

const labelStyle = {
    width:"150",
    height:"300",
    minWidth: "100",

};

export default class RedmineSettings extends React.Component {
    constructor(props) {
        super(props);
        this.RedmineProjectList = this.RedmineProjectList.bind(this);
        this.RedmineTrackerList = this.RedmineTrackerList.bind(this);
        this.RedmineUserList = this.RedmineUserList.bind(this);
    }

    RedmineProjectList() {
        let redminetrackerName = [];
        for (let i = 0, redminetrackerNumber = 0; i < this.props.container[0].length; i++) {
            let result = {
                value: this.props.container[0][i].id,
                label: this.props.container[0][i].name,
                id: this.props.container[0][i].id
            };
            redminetrackerName[redminetrackerNumber] = result;
            redminetrackerNumber++;
        }
        return redminetrackerName;
    }

    RedmineTrackerList() {
        let redmineUserName = [];
        for (let i = 0, redmineUserNumber = 0; i < this.props.container[1].length; i++) {
            let result = {
                value: this.props.container[1][i].id,
                label: this.props.container[1][i].name,
                id: this.props.container[1][i].id
            };
            redmineUserName[redmineUserNumber] = result;
            redmineUserNumber++;
        }
        return redmineUserName;
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
                                    options={this.RedmineProjectList()}
                                    searchable={true}
                                    value={this.props.projectDefault}
                                    simpleValue
                                    autoFocus={true}
                                    clearable={false}
                                    onChange={this.props.projectValue}
                            />
                        </span>
                    </th>
                </tr>
                <tr>
                    <th>
                        <div className="code-components-cell"><span><h3>Redmine Trackers : </h3></span></div>
                    </th>
                    <th>
                        <div className="selection">
                            <Select id="trackers-select"
                                    name="trackers-select"
                                    style={labelStyle}
                                    options={this.RedmineTrackerList()}
                                    searchable={true}
                                    value={this.props.trackerDefault}
                                    simpleValue
                                    autoFocus={true}
                                    clearable={false}
                                    onChange={this.props.trackerValue}
                            />
                        </div>
                    </th>
                </tr>
                <tr>
                    <th>
                        <div className="code-components-cell"><span><h3>Redmine Users : </h3></span></div>
                    </th>
                    <th>
                        <div className="selection">
                            <Select id="users-select"
                                    name="users-select"
                                    style={labelStyle}
                                    options={this.RedmineUserList()}
                                    value={this.props.userDefault}
                                    searchable={true}
                                    simpleValue
                                    autoFocus={true}
                                    clearable={false}
                                    onChange={this.props.userValue}
                            />
                        </div>
                    </th>
                </tr>
            </table>
        );
    }
}
