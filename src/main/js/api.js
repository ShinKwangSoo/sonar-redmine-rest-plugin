/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import {getJSON, post} from 'sonar-request';
import axios from "axios"; // see https://github.com/SonarSource/sonarqube/blob/master/server/sonar-web/src/main/js/app/utils/exposeLibraries.js

export function findIssueBug(project) {
    return getJSON('/api/issues/search', {
        p: 1,
        ps: 100,
        s: "SEVERITY",
        asc: false,
        types: "BUG",
        resolved: false,
        componentKeys: project.key
    }).then(function (response) {
        var data = [];
        var numberOfIssue = 0;
        const numberOfIssueList = response.issues.length;
        if (numberOfIssueList > 0) {
            for (let i = 0; i < numberOfIssueList; i++) {
                let result = {
                    key: response.issues[i].key,
                    rule: "",
                    severity: "",
                    component: "",
                    line: "",
                    message: "",
                    type: "",
                };
                result.component = response.issues[i].component;
                result.line = response.issues[i].line;
                result.message = response.issues[i].message;
                result.rule = response.issues[i].rule;
                result.severity = response.issues[i].severity;
                result.type = response.issues[i].type;
                data[numberOfIssue] = result;
                numberOfIssue++;
            }
        }
        return data;
    });
}

export function findIssueVULNERABILITY(project) {
    return getJSON('/api/issues/search', {
        p: 1,
        ps: 100,
        s: "SEVERITY",
        asc: false,
        resolved: false,
        types: "VULNERABILITY",
        componentKeys: project.key
    }).then(function (response) {
        var data = [];
        var numberOfIssue = 0;
        const numberOfIssueList = response.issues.length;
        if (numberOfIssueList > 0) {
            for (let i = 0; i < numberOfIssueList; i++) {
                let result = {
                    key: response.issues[i].key,
                    rule: "",
                    severity: "",
                    component: "",
                    line: "",
                    message: "",
                    type: ""
                };
                result.component = response.issues[i].component;
                result.line = response.issues[i].line;
                result.message = response.issues[i].message;
                result.rule = response.issues[i].rule;
                result.severity = response.issues[i].severity;
                result.type = response.issues[i].type;
                data[numberOfIssue] = result;
                numberOfIssue++;
            }
        }
        return data;
    });
}

export function findIssueCodeSmell(project) {
    return getJSON('/api/issues/search', {
        p: 1,
        ps: 100,
        s: "SEVERITY",
        asc: false,
        resolved: false,
        types: "CODE_SMELL",
        componentKeys: project.key
    }).then(function (response) {
        var data = [];
        var numberOfIssue = 0;
        const numberOfIssueList = response.issues.length;
        if (numberOfIssueList > 0) {
            for (let i = 0; i < numberOfIssueList; i++) {
                let result = {
                    key: response.issues[i].key,
                    rule: "",
                    severity: "",
                    component: "",
                    line: "",
                    message: "",
                    type: ""
                };
                result.component = response.issues[i].component;
                result.line = response.issues[i].line;
                result.message = response.issues[i].message;
                result.rule = response.issues[i].rule;
                result.severity = response.issues[i].severity;
                result.type = response.issues[i].type;
                data[numberOfIssue] = result;
                numberOfIssue++;
            }
        }
        return data;
    });
}

export function findIssue_NextPage(project,count,types) {
    return getJSON('/api/issues/search', {
        p: count,
        ps: 100,
        s: "SEVERITY",
        asc: false,
        types: types,
        componentKey: project.key
    }).then(function (response) {
        var data = [];
        var numberOfIssue = 0;
        const numberOfIssueList = response.issues.length;
        if (numberOfIssueList > 0) {
            for (let i = 0; i < numberOfIssueList; i++) {
                let result = {
                    key: response.issues[i].key,
                    rule: "",
                    severity: "",
                    component: "",
                    line: "",
                    message: "",
                    type: ""
                };
                result.component = response.issues[i].component;
                result.line = response.issues[i].line;
                result.message = response.issues[i].message;
                result.rule = response.issues[i].rule;
                result.severity = response.issues[i].severity;
                result.type = response.issues[i].type;
                data[numberOfIssue] = result;
                numberOfIssue++;
            }
        }
        return data;
    });
}

export function findIssueCODE_SMELL_NextPage(project,count) {
    return getJSON('/api/issues/search', {
        p: count,
        ps: 100,
        s: "SEVERITY",
        asc: false,
        types: "CODE_SMELL",
        componentKey: project.key
    }).then(function (response) {
        var data = [];
        var numberOfIssue = 0;
        const numberOfIssueList = response.issues.length;
        if (numberOfIssueList > 0) {
            for (let i = 0; i < numberOfIssueList; i++) {
                let result = {
                    key: response.issues[i].key,
                    rule: "",
                    severity: "",
                    component: "",
                    line: "",
                    message: "",
                    type: ""
                };
                result.component = response.issues[i].component;
                result.line = response.issues[i].line;
                result.message = response.issues[i].message;
                result.rule = response.issues[i].rule;
                result.severity = response.issues[i].severity;
                result.type = response.issues[i].type;
                data[numberOfIssue] = result;
                numberOfIssue++;
            }
        }
        return data;
    });
}

export function RedmineSettingsAPI() {
    var projectData = [];
    var trackerData = [];
    var userData = [];
    var settingData = [];

    return getJSON('/api/settings/values?keys=sonar.redmine.hosturl,sonar.redmine.api-access-key').then(function (RedmineSettingsInfo) {
        const redmineSettingsData = RedmineSettingsInfo.settings.length;
        for (let i = 0; i < redmineSettingsData; i++) {
            if (RedmineSettingsInfo.settings[i].key === 'sonar.redmine.hosturl') {
                var url = RedmineSettingsInfo.settings[i].value;
            }
            else {
                var acc = RedmineSettingsInfo.settings[i].value;
            }
        }
        axios({
            headers: {
                'X-Redmine-API-KEY': acc,
                'Content-Type': 'application/json'
            },
            method: 'get',
            limit: 1000,
            url: url + '/projects.json'
        }).then(function (RedmineProjectInfo) {
            var number = 0;
            for (let i = 0; i < RedmineProjectInfo.data.projects.length; i++) {
                let projects = {
                    id: RedmineProjectInfo.data.projects[i].identifier,
                    name: ''
                };
                projects.name = RedmineProjectInfo.data.projects[i].name;
                projectData[number] = projects
                number++;
            }
            settingData[0] = projectData;
        });
        axios({
            headers: {
                'X-Redmine-API-KEY': acc,
                'Content-Type': 'application/json'
            },
            method: 'get',
            url: url + '/trackers.json'
        }).then(function (RedmineTrackerInfo) {
            var number = 0;
            for (let i = 0; i < RedmineTrackerInfo.data.trackers.length; i++) {
                let trackers = {
                    id: RedmineTrackerInfo.data.trackers[i].id,
                    name: ''
                };
                trackers.name = RedmineTrackerInfo.data.trackers[i].name;
                trackerData[number] = trackers
                number++;
            }
            settingData[1] = trackerData;
        });
        axios({
            headers: {
                'X-Redmine-API-KEY': acc,
                'Content-Type': 'application/json'
            },
            method: 'get',
            limit: 1000,
            url: url + '/users.json'
        }).then(function (RedmineUserInfo) {
            var number = 0;
            for (let i = 0; i < RedmineUserInfo.data.users.length; i++) {
                let users = {
                    id: RedmineUserInfo.data.users[i].id,
                    firstname: '',
                    lastname: ''
                };
                users.firstname = RedmineUserInfo.data.users[i].firstname;
                users.lastname = RedmineUserInfo.data.users[i].lastname;
                userData[number] = users
                number++;
            }
            settingData[2] = userData;
        });
        return settingData;
    });
}

export function saveSettingToRedmine(project) {
    let saveSettingsData = [];
    return getJSON('/api/settings/values?component=' + project.key + '&keys=sonar.redmine.hosturl,sonar.redmine.api-access-key,sonar.redmine.project-key,sonar.redmine.tracker-id,sonar.redmine.user-id').then(function (RedmineSettingsInfo) {
        const redmineSettingsData = RedmineSettingsInfo.settings.length;
        for (let i = 0; i < redmineSettingsData; i++) {
            if (RedmineSettingsInfo.settings[i].key === 'sonar.redmine.hosturl') {
                var url = RedmineSettingsInfo.settings[i].value;
            }
            else if (RedmineSettingsInfo.settings[i].key === 'sonar.redmine.api-access-key') {
                var acc = RedmineSettingsInfo.settings[i].value;
            }
            else if (RedmineSettingsInfo.settings[i].key === 'sonar.redmine.project-key') {
                var project = RedmineSettingsInfo.settings[i].value;
            }
            else if (RedmineSettingsInfo.settings[i].key === 'sonar.redmine.tracker-id') {
                var tracker = RedmineSettingsInfo.settings[i].value;
            }
            else {
                var user = RedmineSettingsInfo.settings[i].value;
            }
        }
        axios({
            headers: {
                'X-Redmine-API-KEY': acc,
                'Content-Type': 'application/json'
            },
            method: 'get',
            url: url + '/projects/' + project + '.json'
        }).then(function (RedmineProjectInfo) {
            if (RedmineProjectInfo.data.project != null) {
                let projects = {
                    id: RedmineProjectInfo.data.project.identifier,
                    value: RedmineProjectInfo.data.project.name,
                    label: RedmineProjectInfo.data.project.name
                };
                saveSettingsData[0] = projects;
            }
        });
        axios({
            headers: {
                'X-Redmine-API-KEY': acc,
                'Content-Type': 'application/json'
            },
            method: 'get',
            url: url + '/projects/' + project + '.json?include=trackers'
        }).then(function (RedmineTrackerInfo) {
            for (let i = 0; i < RedmineTrackerInfo.data.project.trackers.length; i++) {
                if (RedmineTrackerInfo.data.project.trackers[i].id == parseInt(tracker)) {
                    let trackers = {
                        id: RedmineTrackerInfo.data.project.trackers[i].id,
                        value: RedmineTrackerInfo.data.project.trackers[i].name,
                        label: RedmineTrackerInfo.data.project.trackers[i].name
                    };
                    saveSettingsData[1] = trackers
                }
            }
        });
        axios({
            headers: {
                'X-Redmine-API-KEY': acc,
                'Content-Type': 'application/json'
            },
            method: 'get',
            url: url + '/users/' + user + '.json'
        }).then(function (RedmineUserInfo) {
            let users = {
                id: RedmineUserInfo.data.user.id,
                value: RedmineUserInfo.data.user.firstname,
                label: RedmineUserInfo.data.user.firstname
            };
            saveSettingsData[2] = users;
        });
        return saveSettingsData;
    });
}

export function IssueToRedmine(sonar_project, issue, hosturl) {
    let issuekey = issue.key;
    let issuerule = issue.rule;
    let issuemessage = issue.message;
    let issuecomponent = issue.component;
    let issueline = issue.line;
    let issueseverity = issue.severity;
    let issuetype = issue.type;
    let sonar_host_url = hosturl;
    getJSON('/api/settings/values?component=' + sonar_project.key + '&keys=sonar.redmine.hosturl,sonar.redmine.api-access-key,sonar.redmine.project-key,sonar.redmine.tracker-id,sonar.redmine.user-id')
        .then(function (sonarPredmine) {
                const sonarkeylength = sonarPredmine.settings.length;
                for (let i = 0; i < sonarkeylength; i++) {
                    if (sonarPredmine.settings[i].key === 'sonar.redmine.hosturl') {
                        var url = sonarPredmine.settings[i].value;
                    }
                    else if (sonarPredmine.settings[i].key === 'sonar.redmine.api-access-key') {
                        var acc = sonarPredmine.settings[i].value;
                    }
                    else if (sonarPredmine.settings[i].key === 'sonar.redmine.project-key') {
                        var project = sonarPredmine.settings[i].value;
                    }
                    else if (sonarPredmine.settings[i].key === 'sonar.redmine.tracker-id') {
                        var tracker = sonarPredmine.settings[i].value;
                    }
                    else {
                        var user = sonarPredmine.settings[i].value;
                    }
                }
                axios({
                    headers: {
                        'X-Redmine-API-KEY': acc,
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    url: url + '/issues.json',
                    transformRequest: [
                        (data, headers) => {
                            data = {
                                "issue": {
                                    "project_id": project,
                                    "subject": issuerule + " : " + issuemessage,
                                    "tracker_id": tracker,
                                    "assigned_to_id": user,
                                    "description": issuerule + '\n' + issuemessage + '\n\n' + '\n\n Source Code location:\n' + issuecomponent + ' Line : ' + issueline + '\n\n' + 'check the sonarqube \n<' + sonar_host_url + '/project/issues?id=' + sonar_project.key.replace(':', '%3A') + '&open=' + issuekey + '&severities=' + issueseverity + '&types=' + issuetype + '>'
                                }
                            };
                            return JSON.stringify(data)
                        },
                    ]
                }).then(function (restRedmine) {
                    if (restRedmine.status === 201) {
                        post('/api/issues/add_comment', {
                            issue: issuekey,
                            text: url + '/issues/' + restRedmine.data.issue.id
                        });
                    }
                }).catch(error => {
                    console.log(error.response)
                });
            }
        );
}

export function SelectedIssueToRedmine(sonar_project, issue, hosturl,user) {
    let issuekey = issue.key;
    let issuerule = issue.rule;
    let issuemessage = issue.message;
    let issuecomponent = issue.component;
    let issueline = issue.line;
    let issueseverity = issue.severity;
    let issuetype = issue.type;
    let selectToIssueUser=user;
    let sonar_host_url = hosturl;
    getJSON('/api/settings/values?component=' + sonar_project.key + '&keys=sonar.redmine.hosturl,sonar.redmine.api-access-key,sonar.redmine.project-key,sonar.redmine.tracker-id')
        .then(function (sonarPredmine) {
                const sonarkeylength = sonarPredmine.settings.length;
                for (let i = 0; i < sonarkeylength; i++) {
                    if (sonarPredmine.settings[i].key === 'sonar.redmine.hosturl') {
                        var url = sonarPredmine.settings[i].value;
                    }
                    else if (sonarPredmine.settings[i].key === 'sonar.redmine.api-access-key') {
                        var acc = sonarPredmine.settings[i].value;
                    }
                    else if (sonarPredmine.settings[i].key === 'sonar.redmine.project-key') {
                        var project = sonarPredmine.settings[i].value;
                    }
                    else if (sonarPredmine.settings[i].key === 'sonar.redmine.tracker-id') {
                        var tracker = sonarPredmine.settings[i].value;
                    }
                }
                axios({
                    headers: {
                        'X-Redmine-API-KEY': acc,
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    url: url + '/issues.json',
                    transformRequest: [
                        (data, headers) => {
                            data = {
                                "issue": {
                                    "project_id": project,
                                    "subject": issuerule + " : " + issuemessage,
                                    "tracker_id": tracker,
                                    "assigned_to_id": selectToIssueUser,
                                    "description": issuerule + '\n' + issuemessage + '\n\n' + '\n\n Source Code location:\n' + issuecomponent + ' Line : ' + issueline + '\n\n' + 'check the sonarqube \n<' + sonar_host_url + '/project/issues?id=' + sonar_project.key.replace(':', '%3A') + '&open=' + issuekey + '&severities=' + issueseverity + '&types=' + issuetype + '>'
                                }
                            };
                            return JSON.stringify(data)
                        },
                    ]
                }).then(function (restRedmine) {
                    if (restRedmine.status === 201) {
                        post('/api/issues/add_comment', {
                            issue: issuekey,
                            text: url + '/issues/' + restRedmine.data.issue.id
                        });
                    }
                }).catch(error => {
                    console.log(error.response)
                });
            }
        );
}


export function TFRedmine(issue) {
    return getJSON('/api/issues/search?issues=' + issue + '&additionalFields=comments').then(function (TFIssueResponse) {
        let commentData;
        if (TFIssueResponse.issues[0].comments.length !== 0) {
            commentData = TFIssueResponse.issues[0].comments[0].markdown
        } else {
            commentData = false;
        }
        return commentData
    });
}

export function ruleDataRestAPI(rulekey) {
    return getJSON('/api/rules/show?key=' + rulekey).then(function (ruleResponseData) {
        let ruledata = {
            name: '',
            htmlDesc: ''
        }
        ruledata.name = ruleResponseData.rule.name;
        ruledata.htmlDesc = ruleResponseData.rule.htmlDesc;
        return ruledata
    })
}

export function SonarHostURL() {
    return getJSON('/api/system/info').then(function (responseSettingData) {
        let contextData = [];
        if (responseSettingData.staus != 200 || responseSettingData.staus != 201) {
            const ArraySystem = Object.keys(responseSettingData.Settings).reduce(function (out, key) {
                out.push({
                    key: key,
                    value: responseSettingData.Settings[key]
                });
                return out;
            }, []);
            for (let i = 0; i < ArraySystem.length; i++) {
                if (ArraySystem[i].key == "sonar.web.context") {
                    contextData[0] = ArraySystem[i].value;
                }
            }
            return contextData;
        }
    })
}


export function settingToRedmineProject(project, redmine_projectid) {
    post('/api/settings/set', {component: project.key, key: 'sonar.redmine.project-key', value: redmine_projectid});
}

export function settingToRedmineTracker(project, redmine_trackerid) {
    post('/api/settings/set', {component: project.key, key: 'sonar.redmine.tracker-id', value: redmine_trackerid});
}

export function settingToRedmineUser(project, redmine_userid) {
    post('/api/settings/set', {component: project.key, key: 'sonar.redmine.user-id', value: redmine_userid});
}
