import React from "react";
import axios from 'axios';
import Select from 'react-select';

export default class RedmineSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            trackers: [],
            users: []
        }

        this.RedmineSettings = this.RedmineSettings.bind(this);
    }

    RedmineSettings() {
        let currentComponent = this;
        axios.get('/api/settings/values?keys=sonar.redmine.hosturl,sonar.redmine.api-access-key').then(function (RedmineSettingsInfo) {
            const redmineSettingsData = RedmineSettingsInfo.data.settings.length;
            for (let i = 0; i < redmineSettingsData; i++) {
                if (RedmineSettingsInfo.data.settings[i].key === 'sonar.redmine.hosturl') {
                    var url = RedmineSettingsInfo.data.settings[i].value;
                }
                else {
                    var acc = RedmineSettingsInfo.data.settings[i].value;
                }
            }
            axios({
                headers: {
                    'X-Redmine-API-KEY': acc,
                    'Content-Type': 'application/json'
                },
                limit: '500',
                method: 'get',
                url: url + '/projects.json'
            }).then(function (RedmineProjectInfo) {
                currentComponent.setState({projects: RedmineProjectInfo.data.projects.name})
                axios({
                    headers: {
                        'X-Redmine-API-KEY': acc,
                        'Content-Type': 'application/json'
                    },
                    method: 'get',
                    url: url + '/trackers.json'
                }).then(function (RedmineTrackerInfo) {
                    currentComponent.setState({trackers: RedmineTrackerInfo.data.trackers.name})
                    axios({
                        headers: {
                            'X-Redmine-API-KEY': acc,
                            'Content-Type': 'application/json'
                        },
                        method: 'get',
                        url: url + '/users.json'
                    }).then(function (RedmineUserInfo) {
                        currentComponent.setState({users: RedmineUserInfo.data.users.firstname})
                    })
                })
            })
        })
    }

    render() {
        this.RedmineSettings()
        return (
            <table>
                <tr>
                    <th>
                        <div className="code-components-cell"><span><h3>Redmine Projects : </h3></span></div>
                    </th>
                    <th>
                        <div className="selection">
                            <Select id="project-select" name="selected-state" value={this.state.projects}
                                    searchable={true} simpleValue/>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th>
                        <div className="code-components-cell"><span><h3>Redmine Trackers : </h3></span></div>
                    </th>
                    <th>
                        <div className="selection">
                            <Select id="trackers-select" name="selected-state" value={this.state.trackers}
                                    searchable={true} simpleValue/>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th>
                        <div className="code-components-cell"><span><h3>Redmine Users : </h3></span></div>
                    </th>
                    <th>
                        <div className="selection">
                            <Select id="users-select" name="selected-state" value={this.state.users} searchable={true}
                                    simpleValue/>
                        </div>
                    </th>
                </tr>
            </table>
        );
    }
}
