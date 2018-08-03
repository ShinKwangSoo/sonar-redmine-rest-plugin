package org.sonar.plugins.redmine.computerEngine;


import org.sonar.api.batch.postjob.PostJob;
import org.sonar.api.batch.postjob.PostJobContext;
import org.sonar.api.batch.postjob.PostJobDescriptor;
import org.sonar.api.batch.postjob.issue.PostJobIssue;
import org.sonar.plugins.redmine.config.RedmineSettingsConfiguration;
import org.sonarqube.ws.Issues;
import org.sonarqube.ws.client.HttpConnector;
import org.sonarqube.ws.client.WsClient;
import org.sonarqube.ws.client.WsClientFactories;
import org.sonarqube.ws.client.issue.SearchWsRequest;

public class SonarqubeIssueInScannerPostJob implements PostJob {

    private final RedmineSettingsConfiguration redmineSettingsConfiguration;

    public SonarqubeIssueInScannerPostJob(RedmineSettingsConfiguration redmineSettingsConfiguration) {
        this.redmineSettingsConfiguration = redmineSettingsConfiguration;
    }

    public void describe(PostJobDescriptor descriptor) {
        descriptor.name("Send Redmine");
    }

    @Override
    public void execute(PostJobContext context) {
        if (context.analysisMode().isIssues()) {
            for (PostJobIssue issue : context.issues()) {
                if (redmineSettingsConfiguration.Bug() == true) {
                    for (int i = 0; i < redmineSettingsConfiguration.AUTO_SEVERITY_LEVEL(redmineSettingsConfiguration.AUTO_SEVERITY()); i++) {
                        String key = issue.key();
                        String ruleKey = issue.ruleKey().toString();
                        String component = issue.componentKey();
                        Integer line = issue.line();
                        String message = issue.message();
                        if (issue.severity().toString() == redmineSettingsConfiguration.AUTO_SEVERITY()) {
                            String severity = issue.severity().toString();
                        }
                        HttpConnector httpConnector = HttpConnector.newBuilder().url(redmineSettingsConfiguration.baseUrl()).credentials("admin", "admin").token("your_token").build();
                        WsClient wsClient = WsClientFactories.getDefault().newClient(httpConnector);
                        SearchWsRequest searchWsRequest = new SearchWsRequest();
                        Issues.SearchWsResponse response = wsClient.issues().search(searchWsRequest);
                    }
                }
            }
        }
    }
}
