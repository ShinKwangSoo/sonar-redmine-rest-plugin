import React from "react";
import axios from 'axios';
import Select from 'react-select';

export default class RedmineSettings extends React.Component {
    constructor() {
        super();
        this.RedmineSettings = this.RedmineSettings.bind(this);
        this.state = {
            projects: [],
            trackers: [],
            users: []
        }

        RedmineSettings()
        {
            axios.get('/api/settings/values?keys=sonar.redmine.hosturl,sonar.redmine.api-access-key').then(function (RedmineSettingsInfo) {
                const redmineSettinsData = RedmineSettingsInfo.data.settings.length;
                for (let i = 0; i < redmineSettinsData; i++) {
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
                    method: 'get',
                    url: url + '/projects.json'
                }).then(function (RedmineProjectInfo) {
                    this.setState({projects: RedmineProjectInfo.data.projects.name})
                    axios({
                        headers: {
                            'X-Redmine-API-KEY': acc,
                            'Content-Type': 'application/json'
                        },
                        method: 'get',
                        url: url + '/trackers.json'
                    }).then(function (RedmineTrackerInfo) {
                        this.setState({trackers: RedmineTrackerInfo.data.trackers.name})
                        axios({
                            headers: {
                                'X-Redmine-API-KEY': acc,
                                'Content-Type': 'application/json'
                            },
                            method: 'get',
                            url: url + '/users.json'
                        }).then(function (RedmineUserInfo) {
                            this.setState({users: RedmineUserInfo.data.users.firstname})
                        })
                    })
                })
            })
        }

        render()
        {
            return (
                <table>
                    <tr>
                        <th>
                            <div className="code-components-cell"><span>Redmine Projects</span></div>
                        </th>
                        <th>
                            <div className="selection">
                                <Select id="project-select" name="selected-state" value={this.state.projects} searchable={true} simpleValue/>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <div className="code-components-cell"><span>Redmine Trackers</span></div>
                        </th>
                        <th>
                            <div className="selection">
                                <Select id="trackers-select" name="selected-state" value={this.state.trackers} searchable={true} simpleValue/>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <div className="code-components-cell"><span>Redmine Users</span></div>
                        </th>
                        <th>
                            <div className="selection">
                                <Select id="users-select" name="selected-state" value={this.state.users} searchable={true} simpleValue/>
                            </div>
                        </th>
                    </tr>
                </table>
            );
        }
    }
}