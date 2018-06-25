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
package org.sonar.plugins.redmine.reviews;

import com.taskadapter.redmineapi.bean.TrackerFactory;
import org.sonar.api.CoreProperties;
import org.sonar.api.batch.rule.ActiveRules;
import org.sonar.api.config.Configuration;
import org.sonar.api.i18n.I18n;
import org.sonar.api.issue.Issue;
import org.sonar.api.rules.Rule;
import org.sonar.api.server.ServerSide;
import org.sonar.plugins.redmine.RedmineConstants;
import org.sonar.plugins.redmine.config.RedmineSettings;

import java.util.Locale;

import static java.lang.Integer.parseInt;

public abstract class RedmineIssueFactory implements ServerSide {
  private I18n i18n;
  private Configuration settings;
  private ActiveRules ruleFinder;
  private Rule rule;

  public RedmineIssueFactory(I18n i18n, Configuration settings, ActiveRules ruleFinder) {
    this.i18n = i18n;
    this.settings = settings;
    this.ruleFinder = ruleFinder;
  }

  public com.taskadapter.redmineapi.bean.Issue createRedmineIssue(Issue issue, RedmineSettings rSettings) {
    com.taskadapter.redmineapi.bean.Issue redmineIssue = new com.taskadapter.redmineapi.bean.Issue();

    rule = (Rule) ruleFinder.find(issue.ruleKey());

    redmineIssue.setTracker(new TrackerFactory().create(parseInt(rSettings.TRACKER_ID), null));
    redmineIssue.setPriorityId(parseInt(rSettings.PRIORITY_ID));
    redmineIssue.setSubject(createIssueSubject(issue));
    redmineIssue.setDescription(createIssueDescription(issue, settings.getStringArray(CoreProperties.SERVER_BASE_URL)));

    return redmineIssue;
  }

  private String createIssueSubject(Issue issue) {
    if (rule == null) {
      return i18n.message(Locale.getDefault(), RedmineConstants.LINKED_ISSUE_SUBJECT_TEMPLATE_NO_RULE, "", issue.key());
    } else {
      return i18n.message(Locale.getDefault(), RedmineConstants.LINKED_ISSUE_SUBJECT_TEMPLATE, "", issue.key(), (rule.getName() == null) ? "" :rule.getName());
    }
  }

  private String createIssueDescription(Issue issue, String[] baseUrl) {
    StringBuilder sb = new StringBuilder();
    sb.append(baseUrl);
    sb.append("/issue/show/");
    sb.append(issue.key());

    if (rule == null) {
      return i18n.message(Locale.getDefault(), RedmineConstants.LINKED_ISSUE_DESCRIPTION_TEMPLATE_WITHOUT_MESSAGE, "", sb.toString());
    } else {
      return i18n.message(Locale.getDefault(), RedmineConstants.LINKED_ISSUE_DESCRIPTION_TEMPLATE_WITH_MESSAGE, "",
          rule.getKey() + (rule.getName() == null ? "" : " - " + rule.getName()), sb.toString());
    }
  }
}
