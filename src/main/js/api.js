/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import {getJSON} from 'sonar-request'; // see https://github.com/SonarSource/sonarqube/blob/master/server/sonar-web/src/main/js/app/utils/exposeLibraries.js

export function findIssueAndToRedmine(project) {
    return getJSON('/api/issues/search', {
        p: 1,
        ps: 50,
        componentKey: project.key
    }).then(function (response) {
        var data = [];
        var numberOfIssue = 0;
        const numberOfIssueList = response.issues.length;
        console.log(response.issues.length);
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

export function findVersionsAndMeasures(project) {

    return getJSON('/api/project_analyses/search', {
        project: project.key,
        p: 1,
        ps: 500,
    }).then(function (responseAnalyses) {
        const numberOfAnalyses = responseAnalyses.analyses.length;
        if (numberOfAnalyses > 0) {

            return getJSON('/api/measures/search_history', {
                component: project.key,
                metrics: "alert_status,bugs,vulnerabilities,code_smells,reliability_rating,security_rating,sqale_rating",
                ps: 1000
            }).then(function (responseMetrics) {
                var data = [];
                var numberOfVersions = 0;

                for (let i = 0; i < numberOfAnalyses; i++) {
                    let analysis = responseAnalyses.analyses[i];
                    for (let j = 0; j < analysis.events.length; j++) {
                        if (analysis.events[j].category === "VERSION") {
                            let result = {
                                version: analysis.events[j].name,
                                alert_status: "",
                                bugs: "0", vulnerabilities: "0", code_smells: "0",
                                reliability_rating: "", security_rating: "", sqale_rating: ""
                            };
                            const numberOfMeasuresRetrieved = 7;

                            for (let k = 0; k < numberOfMeasuresRetrieved; k++) {
                                for (let d = 0; d < responseMetrics.measures[k].history.length; d++) {
                                    if (responseMetrics.measures[k].history[d].date === responseAnalyses.analyses[i].date) {
                                        //console.log(responseMetrics.measures[k].metric);
                                        if (responseMetrics.measures[k].metric === "bugs") {
                                            result.bugs = responseMetrics.measures[k].history[d].value;
                                        } else if (responseMetrics.measures[k].metric === "vulnerabilities") {
                                            result.vulnerabilities = responseMetrics.measures[k].history[d].value;
                                        } else if (responseMetrics.measures[k].metric === "code_smells") {
                                            result.code_smells = responseMetrics.measures[k].history[d].value;
                                        } else if (responseMetrics.measures[k].metric === "alert_status") {
                                            result.alert_status = responseMetrics.measures[k].history[d].value;
                                        } else if (responseMetrics.measures[k].metric === "reliability_rating") {
                                            result.reliability_rating = responseMetrics.measures[k].history[d].value;
                                        } else if (responseMetrics.measures[k].metric === "security_rating") {
                                            result.security_rating = responseMetrics.measures[k].history[d].value;
                                        } else if (responseMetrics.measures[k].metric === "sqale_rating") {
                                            result.sqale_rating = responseMetrics.measures[k].history[d].value;
                                        }
                                    }
                                }
                            }

                            data[numberOfVersions] = result;
                            numberOfVersions++;
                        }
                    }
                }
                //console.table(data);
                return data;
            });
        }
    });
}
