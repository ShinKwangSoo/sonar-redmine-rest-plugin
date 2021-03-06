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
                    author:""
                };
                result.component = response.issues[i].component;
                result.line = response.issues[i].line;
                result.message = response.issues[i].message;
                result.rule = response.issues[i].rule;
                result.severity = response.issues[i].severity;
                result.type = response.issues[i].type;
                result.author=response.issues[i].author;
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
                    type: "",
                    author:""
                };
                result.component = response.issues[i].component;
                result.line = response.issues[i].line;
                result.message = response.issues[i].message;
                result.rule = response.issues[i].rule;
                result.severity = response.issues[i].severity;
                result.type = response.issues[i].type;
                result.author=response.issues[i].author;
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
                    type: "",
                    author:""
                };
                result.component = response.issues[i].component;
                result.line = response.issues[i].line;
                result.message = response.issues[i].message;
                result.rule = response.issues[i].rule;
                result.severity = response.issues[i].severity;
                result.type = response.issues[i].type;
                result.author=response.issues[i].author;
                data[numberOfIssue] = result;
                numberOfIssue++;
            }
        }
        return data;
    });
}

export function findIssue_NextPage(project, count, types) {
    return getJSON('/api/issues/search', {
        p: count,
        ps: 100,
        s: "SEVERITY",
        asc: false,
        types: types,
        componentKey: project.key
    }).then(function (response) {
        console.log("componentKey : ",project.key);
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
                    author:""
                };
                result.component = response.issues[i].component;
                result.line = response.issues[i].line;
                result.message = response.issues[i].message;
                result.rule = response.issues[i].rule;
                result.severity = response.issues[i].severity;
                result.type = response.issues[i].type;
                result.author=response.issues[i].author;
                data[numberOfIssue] = result;
                numberOfIssue++;
            }
        }
        return data;
    });
}

export function findIssueCODE_SMELL_NextPage(project, count) {
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
                    type: "",
                    author:""
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

export function UserSyncRestAPI(project){
    var userData=[];
    var SonarSyncData=[];
    return getJSON('/api/settings/values?keys=sonar.redmine.hosturl,sonar.redmine.api-access-key').then(function (RedmineSettingsInfo) {
        const redmineSettingsData = RedmineSettingsInfo.settings.length;
        for (let i = 0; i < redmineSettingsData; i++) {
            if (RedmineSettingsInfo.settings[i].key === 'sonar.redmine.hosturl') {
                var url = RedmineSettingsInfo.settings[i].value;
            } else {
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
                userData[number] = users;
                number++;
            }
            SonarSyncData[0] = userData;
            console.log(SonarSyncData[0])
        });
        post('/api/settings/reset', {keys: 'sonar.redmine.user-list'}) &&
        post('/api/settings/set', {key: 'sonar.redmine.user-list', fieldValues: SonarSyncData[0]});
    });
}

export function RedmineSettingsAPI() {
    var projectData = [];
    var trackerData = [];
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
                projectData[number] = projects;
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
                trackerData[number] = trackers;
                number++;
            }
            settingData[1] = trackerData;
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
                saveSettingsData[0] = {
                    id: RedmineProjectInfo.data.project.identifier,
                    value: RedmineProjectInfo.data.project.name,
                    label: RedmineProjectInfo.data.project.name
                };
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
                    saveSettingsData[1] = {
                        id: RedmineTrackerInfo.data.project.trackers[i].id,
                        value: RedmineTrackerInfo.data.project.trackers[i].name,
                        label: RedmineTrackerInfo.data.project.trackers[i].name
                    }
                }
            }
        });
        getJSON('/api/settings/values?component='+project.key+'&keys=sonar.redmine.user_list').then(function (RedmineUserInSonar) {
            for (let i = 0; i < RedmineUserInSonar.settings.length; i++) {
                let users = {
                    id: RedmineUserInSonar.data.users[i].id,
                    firstname: '',
                    lastname: ''
                };
                users.firstname = RedmineUserInSonar.data.users[i].firstname;
                users.lastname = RedmineUserInSonar.data.users[i].lastname;
            }
        });
        return saveSettingsData;
    });
}

export function IssueToRedmine(sonar_project, issue, hosturl) {
    let { key, rule, message, component, line, severity, type } = issue;
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
                                    "subject": rule + " : " + message,
                                    "tracker_id": tracker,
                                    "assigned_to_id": user,
                                    "description": rule + '\n' + message + '\n\n' + '\n\n Source Code location:\n' + component + ' Line : ' + line + '\n\n' + 'check the sonarqube \n<' + sonar_host_url + '/project/issues?id=' + sonar_project.key.replace(':', '%3A') + '&open=' + key + '&severities=' + severity + '&types=' + type + '>'
                                }
                            };
                            return JSON.stringify(data)
                        },
                    ]
                }).then(function (restRedmine) {
                    if (restRedmine.status === 201) {
                        post('/api/issues/add_comment', {
                            issue: key,
                            text: url + '/issues/' + restRedmine.data.issue.id
                        });
                    }
                }).catch(error => {
                    console.log(error.response)
                });
            }
        );
}

export function SelectedIssueToRedmine(sonar_project, issue, hosturl, user) {
    let { key, rule, message, component, line, severity, type, author } = issue;
    let selectToIssueUser = user;
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
                getJSON('/api/issues/search?issues=' + issue + '&additionalFields=comments').then(function (commentExsit) {
                    if (commentExsit.issues.length === 0) {
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
                                            "subject": "["+author+"]"+rule + " : " + message,
                                            "tracker_id": tracker,
                                            "assigned_to_id": selectToIssueUser,
                                            "description": rule + '\n' + message + '\n\n' + '\n\n Source Code location:\n' + component + ' Line : ' + line + '\n\n' + 'check the sonarqube \n<' + sonar_host_url + '/project/issues?id=' + sonar_project.key.replace(':', '%3A') + '&open=' + key + '&severities=' + severity + '&types=' + type + '>'
                                        }
                                    };
                                    return JSON.stringify(data)
                                },
                            ]
                        }).then(function (restRedmine) {
                            if (restRedmine.status === 201) {
                                post('/api/issues/add_comment', {
                                    issue: key,
                                    text: url + '/issues/' + restRedmine.data.issue.id
                                });
                            }
                        })
                    }
                })
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
        };
        ruledata.name = ruleResponseData.rule.name;
        ruledata.htmlDesc = ruleResponseData.rule.htmlDesc;
        return ruledata
    })
}

export function SonarHostURL() {
    return getJSON('/api/system/info').then(function (responseSettingData) {
        let contextData = [];
        if (responseSettingData.staus !== 200 || responseSettingData.staus !== 201) {
            const ArraySystem = Object.keys(responseSettingData.Settings).reduce(function (out, key) {
                out.push({
                    key: key,
                    value: responseSettingData.Settings[key]
                });
                return out;
            }, []);
            for (let i = 0; i < ArraySystem.length; i++) {
                if (ArraySystem[i].key === "sonar.web.context") {
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

export function SonarSourceViewAPI(fileKey) {
    let regex = RegExp('\\w+@', 'i');
    let regexReplace = /@/i;
    let sonarScmData = [];
    let sonarData = [];
    return getJSON('/api/sources/show?from=1&key=' + fileKey).then(function(sonarSourceTotalLength){
       if(sonarSourceTotalLength.sources.length<2000){
           return getJSON('/api/sources/scm?from=1&key=' + fileKey).then(function (sonarSourceSCM){
           for (let i = 0; i < sonarSourceSCM.scm.length; i++) {
               let sonarSourceSCMView = {
                   number: '',
                   name: ''
               };
               sonarSourceSCMView.number = sonarSourceSCM.scm[i][0];
               sonarSourceSCMView.name = regexReplace[Symbol.replace](regex.exec(sonarSourceSCM.scm[i][1]), '');
               sonarScmData[i] = sonarSourceSCMView
           }
           for (let i = 0; i < sonarSourceTotalLength.sources.length; i++) {
               let sonarSourceView = {
                   number: '',
                   htmlDesc: '',
                   committer: '',
                   source_more:false,
               };
               sonarSourceView.number = sonarSourceTotalLength.sources[i][0];
               sonarSourceView.htmlDesc = sonarSourceTotalLength.sources[i][1];
               for (let j = 0; j < sonarScmData.length; j++) {
                   if (sonarSourceView.number <= sonarScmData[j].number) {
                       if (sonarSourceView.number === sonarScmData[j].number) {
                           sonarSourceView.committer = sonarScmData[j].name
                       }
                   }
               }
               sonarData[i] = sonarSourceView;
           }
           return sonarData;
           });
       } else {
           return getJSON('/api/sources/show?from=1&key=' + fileKey + '&to=2000').then(function (sonarSource) {
               return getJSON('/api/sources/scm?from=1&key=' + fileKey + '&to=2000').then(function (sonarSourceSCM) {
                   for (let i = 0; i < sonarSourceSCM.scm.length; i++) {
                       let sonarSourceSCMView = {
                           number: '',
                           name: ''
                       };
                       sonarSourceSCMView.number = sonarSourceSCM.scm[i][0];
                       sonarSourceSCMView.name = regexReplace[Symbol.replace](regex.exec(sonarSourceSCM.scm[i][1]), '');
                       sonarScmData[i] = sonarSourceSCMView
                   }
                   for (let i = 0; i < sonarSource.sources.length; i++) {
                       let sonarSourceView = {
                           number: '',
                           htmlDesc: '',
                           committer: '',
                           source_more:true,
                       };
                       sonarSourceView.number = sonarSource.sources[i][0];
                       sonarSourceView.htmlDesc = sonarSource.sources[i][1];
                       for (let j = 0; j < sonarScmData.length; j++) {
                           if (sonarSourceView.number <= sonarScmData[j].number) {
                               if (sonarSourceView.number === sonarScmData[j].number) {
                                   sonarSourceView.committer = sonarScmData[j].name
                               }
                           }
                       }
                       sonarData[i] = sonarSourceView;
                   }
                   return sonarData;
               });
           });
       }
    });
}

export function SonarSourceDataMoreLoad(fileKey, from) {
    let sonarData = [];
    let regex = RegExp('\\w+@', 'i');
    let regexReplace = /@/i;
    let sonarScmData = [];
    return getJSON('/api/sources/show?from=1&key=' + fileKey).then(function(sonarSourceTotalLength) {
        if (sonarSourceTotalLength.sources[sonarSourceTotalLength.sources.length-1][0]===from-1) {
            return getJSON('/api/sources/show?key=' + fileKey + "&from=" + from + "&to=" + from + 2000).then(function (sonarSource) {
                return getJSON('/api/sources/scm?key=' + fileKey + "&from=" + from + "&to=" + from + 2000).then(function (sonarSourceSCM) {
                    for (let i = 0; i < sonarSourceSCM.scm.length; i++) {
                        let sonarSourceSCMView = {
                            number: '',
                            name: ''
                        };
                        sonarSourceSCMView.number = sonarSourceSCM.scm[i][0];
                        sonarSourceSCMView.name = regexReplace[Symbol.replace](regex.exec(sonarSourceSCM.scm[i][1]), '');
                        sonarScmData[i] = sonarSourceSCMView
                    }
                    for (let i = 0; i < sonarSource.sources.length; i++) {
                        let sonarSourceView = {
                            number: '',
                            htmlDesc: '',
                            committer: '',
                            source_more:true,
                        };
                        sonarSourceView.number = sonarSource.sources[i][0];
                        sonarSourceView.htmlDesc = sonarSource.sources[i][1];
                        for (let j = 0; j < sonarScmData.length; j++) {
                            if (sonarSourceView.number <= sonarScmData[j].number) {
                                if (sonarSourceView.number === sonarScmData[j].number) {
                                    sonarSourceView.committer = sonarScmData[j].name
                                }
                            }
                        }
                        sonarData[i] = sonarSourceView
                    }
                    return sonarData;
                });
            });
        }else {
            return getJSON('/api/sources/show?key=' + fileKey + "&from=" + from + "&to=" + from + 2000).then(function (sonarSource) {
                return getJSON('/api/sources/scm?key=' + fileKey + "&from=" + from + "&to=" + from + 2000).then(function (sonarSourceSCM) {
                    for (let i = 0; i < sonarSourceSCM.scm.length; i++) {
                        let sonarSourceSCMView = {
                            number: '',
                            name: ''
                        };
                        sonarSourceSCMView.number = sonarSourceSCM.scm[i][0];
                        sonarSourceSCMView.name = regexReplace[Symbol.replace](regex.exec(sonarSourceSCM.scm[i][1]), '');
                        sonarScmData[i] = sonarSourceSCMView
                    }
                    for (let i = 0; i < sonarSource.sources.length; i++) {
                        let sonarSourceView = {
                            number: '',
                            htmlDesc: '',
                            committer: '',
                            source_more:false,
                        };
                        sonarSourceView.number = sonarSource.sources[i][0];
                        sonarSourceView.htmlDesc = sonarSource.sources[i][1];
                        for (let j = 0; j < sonarScmData.length; j++) {
                            if (sonarSourceView.number <= sonarScmData[j].number) {
                                if (sonarSourceView.number === sonarScmData[j].number) {
                                    sonarSourceView.committer = sonarScmData[j].name
                                }
                            }
                        }
                        sonarData[i] = sonarSourceView
                    }
                    return sonarData;
                });
            });
        }
    });
}
