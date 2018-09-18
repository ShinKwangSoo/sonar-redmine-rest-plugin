/*
 * SonarQube Redmine Plugin
 * Copyright (C) 2013 Patroklos PAPAPETROU and Christian Schulz
 * dev@sonar.codehaus.org
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02
 */
package org.sonar.plugins.redmine.config;


import org.sonar.api.PropertyType;
import org.sonar.api.config.Configuration;
import org.sonar.api.config.PropertyDefinition;
import org.sonar.api.resources.Qualifiers;
import org.sonar.plugins.redmine.model.SeverityStatus;

import java.util.List;

import static java.util.Arrays.asList;

public class RedmineSettings {

    public static final String API_KEY = "sonar.redmine.api-access-key";
    public static final String REDMINE_URL = "sonar.redmine.hosturl";
    public static final String AUTO_REGIST = "sonar.redmine.auto_regist";
    public static final String AUTO_SEVERITY = "sonar.redmine.auto_severity";
    public static final String AUTO_TYPE = "Auto Regist Rule Types";
    public static final String PROJECT_KEY = "sonar.redmine.project-key";
    public static final String USER_ID = "sonar.redmine.user-id";
    public static final String TRACKER_ID = "sonar.redmine.tracker-id";
    public static final String CATEGORY = "Sonar Redmine Plugin";
    public static final String BUG="sonar.redmine.ruleTypes.bugs";
    public static final String CODE_SMELL="sonar.redmine.ruleTypes.code_smell";
    public static final String VULNERABILITY="sonar.redmine.ruleTypes.vulnerability";
    private final Configuration settings;

    public RedmineSettings(Configuration settings) {
        this.settings = settings;
    }

    public static List<PropertyDefinition> getProperties() {
        return asList(
                (PropertyDefinition.builder(API_KEY)
                        .name("API_ACCESS_KEY")
                        .description("You can find your API key on your account page ( /my/account ) when logged in, on the right-hand pane of the default layout.")
                        .category(CATEGORY)
                        .defaultValue("")
                        .type(PropertyType.PASSWORD)
                        .build()),
                (PropertyDefinition.builder(REDMINE_URL)
                        .name("Redmine URL")
                        .description("Example: http://demo.redmine.org/")
                        .category(CATEGORY)
                        .defaultValue("")
                        .build()),
                (PropertyDefinition.builder(AUTO_REGIST)
                        .name("AUTO_REGIST")
                        .description("When the SonarScanner is finished, it automatically registers the job.")
                        .type(PropertyType.BOOLEAN)
                        .defaultValue(String.valueOf(false))
                        .category(CATEGORY)
                        .onlyOnQualifiers(Qualifiers.PROJECT)
                        .build()),
                (PropertyDefinition.builder(AUTO_SEVERITY)
                        .name("AUTO_SEVERITY")
                        .description("Severity to register automatically. Automatically registers more than the selected severity.")
                        .type(PropertyType.SINGLE_SELECT_LIST)
                        .options(SeverityStatus.BLOCKER.getSeverityLabel(),SeverityStatus.CRITICAL.getSeverityLabel(),SeverityStatus.MIJOR.getSeverityLabel(),SeverityStatus.MINOR.getSeverityLabel(),SeverityStatus.INFO.getSeverityLabel())
                        .defaultValue(String.valueOf(SeverityStatus.BLOCKER.getSeverityLabel()))
                        .category(CATEGORY)
                        .onlyOnQualifiers(Qualifiers.PROJECT)
                        .build()),
                (PropertyDefinition.builder(PROJECT_KEY)
                        .name("PROJECT_KEY")
                        .description("Project KEY")
                        .category(CATEGORY)
                        .defaultValue("")
                        .onlyOnQualifiers(Qualifiers.PROJECT)
                        .build()),
                (PropertyDefinition.builder(TRACKER_ID)
                        .name("TRACKER_NAME")
                        .description("Tracker name")
                        .category(CATEGORY)
                        .onlyOnQualifiers(Qualifiers.PROJECT)
                        .build()),
                (PropertyDefinition.builder(USER_ID)
                        .name("User_ID")
                        .description("User_ID")
                        .category(CATEGORY)
                        .onlyOnQualifiers(Qualifiers.PROJECT)
                        .build()));
    }
}

/*
  private Settings settings;

  public RedmineSettings(Settings settings) {
    this.settings = settings;
  }

  public String getHost() {
    return settings.getString(REDMINE_URL);
  }

  public String getApiAccessKey() {
    return settings.getString(API_KEY);
  }

  public String getProjectKey() {
    return settings.getString(PROJECT_KEY);
  }

  public int getPriorityID() {
    return settings.getInt(PRIORITY_ID);
  }

  public int getTrackerID() {
    return settings.getInt(TRACKER_ID);
  }

  public void setHost(String host) {
    settings.setProperty(REDMINE_URL, host);
  }

  public void setApiAccessKey(String apiAccessKey) {
    settings.setProperty(API_KEY, apiAccessKey);
  }

  public void setProjectKey(String projectKey) {
    settings.setProperty(PROJECT_KEY, projectKey);
  }

  public void setPriorityID(int priorityID) {
    settings.setProperty(PRIORITY_ID, priorityID);
  }

  public void setTrackerID(int trackerID) {
    settings.setProperty(TRACKER_ID, trackerID);
  }

  public boolean missingMandatoryParameters() {
    return StringUtils.isEmpty(getHost()) || StringUtils.isEmpty(getProjectKey()) || StringUtils.isEmpty(getApiAccessKey());
  }*/

