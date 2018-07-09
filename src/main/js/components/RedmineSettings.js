import React from "react";
import Select from 'react-select';

export default class RedmineSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectProjectValue: '',
            selectTrackerValue: '',
            selectUserValue: ''
        };
        this.RedmineProjectList = this.RedmineProjectList.bind(this);
        this.RedmineTrackerList = this.RedmineTrackerList.bind(this);
        this.RedmineUserList = this.RedmineUserList.bind(this);
        this.updateProjectValue = this.updateProjectValue.bind(this);
        this.updateTrackerValue = this.updateTrackerValue.bind(this);
        this.updateUserValue = this.updateUserValue.bind(this);
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

    updateProjectValue(ProjectValue) {
        this.setState({selectProjectValue: ProjectValue});
        return this.state.selectProjectValue;
    }

    updateTrackerValue(TrackerValue) {
        this.setState({selectTrackerValue: TrackerValue});
        return this.state.selectTrackerValue;
    }

    updateUserValue(UserValue) {
        this.setState({selectUserValue: UserValue});
        return this.state.selectUserValue;
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
                                    options={this.RedmineProjectList()}
                                    searchable={true}
                                    value={this.state.selectProjectValue}
                                    simpleValue
                                    clearable={false}
                                    onChange={this.updateProjectValue}
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
                                    options={this.RedmineTrackerList()}
                                    searchable={true}
                                    value={this.state.selectTrackerValue}
                                    simpleValue
                                    clearable={false}
                                    onChange={this.updateTrackerValue}
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
                                    options={this.RedmineUserList()}
                                    value={this.state.selectUserValue}
                                    searchable={true}
                                    simpleValue
                                    clearable={false}
                                    onChange={this.updateUserValue}
                            />
                        </div>
                    </th>
                </tr>
            </table>
        );
    }
}
