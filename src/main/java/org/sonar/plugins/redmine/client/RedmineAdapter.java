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
package org.sonar.plugins.redmine.client;

import com.google.common.collect.Maps;
import com.taskadapter.redmineapi.RedmineException;
import com.taskadapter.redmineapi.RedmineManager;
import com.taskadapter.redmineapi.RedmineManagerFactory;
import com.taskadapter.redmineapi.bean.*;
import org.apache.commons.collections.ListUtils;
import org.sonar.api.server.ServerSide;
import org.sonar.plugins.redmine.exceptions.ExceptionUtil;
import java.lang.annotation.Annotation;
import java.util.*;

public class RedmineAdapter implements ServerSide {

  private RedmineManager redmineMgr;

  public void connectToHost(final String host, final String apiKey) throws RedmineException {
    try {
      redmineMgr = RedmineManagerFactory.createWithApiKey(host, apiKey);
    } catch (Exception e) {
      throw ExceptionUtil.wrapException(e);
    }
  }

  public User getCurrentUser() throws RedmineException {
    try {
      // It is required to get the user with its id to fetch project memberships
      return getUser(redmineMgr.getUserManager().getCurrentUser().getId());
    } catch (RedmineException e) {
      throw ExceptionUtil.wrapException(e);
    }
  }

  public Project getProject(String projectKey) throws RedmineException {
    try {
      return redmineMgr.getProjectManager().getProjectByKey(projectKey);

    } catch (RedmineException e) {
      throw ExceptionUtil.wrapException(e);
    }
  }

  public User getUser(int userId) throws RedmineException {
    try {
      return redmineMgr.getUserManager().getUserById(userId);
    } catch (RedmineException e) {
      throw ExceptionUtil.wrapException(e);
    }
  }

  public boolean isMemberOfProject(User user, Project project) {
    boolean isMemberOfProject = false;
    List<Membership> memberships = (List<Membership>) user.getMemberships();
    int projectId = project.getId();

    for (Membership membership : memberships) {
      if (membership.getProject().getId() == projectId) {
        isMemberOfProject = true;
      }
    }

    return isMemberOfProject;
  }

  public List<Tracker> getProjectTracker() throws RedmineException {
    try {
      return redmineMgr.getIssueManager().getTrackers();
    } catch (RedmineException e) {
      throw ExceptionUtil.wrapException(e);
    }
  }


  public List<IssuePriority> getIssuePriorities() throws RedmineException {
    try {
      return redmineMgr.getIssueManager().getIssuePriorities();
    } catch (RedmineException e) {
      throw ExceptionUtil.wrapException(e);
    }
  }

/*  public Issue createIssue(final String projectKey, final Issue issue) throws RedmineException {
    return redmineMgr.getIssueManager().createIssue(projectKey, issue);
  }*/
  public Issue createIssue(final Issue issue) throws RedmineException {
    return redmineMgr.getIssueManager().createIssue(issue);
  }

  public List<Issue> collectProjectIssues(final String projectKey, final Optional<Date> projectDate) throws RedmineException {
    final String date = projectDate == null
        ? null
        : new java.text.SimpleDateFormat("yyyy-MM-dd").format(projectDate);

    //Get open issues first
    Map<String, String> parameters = new HashMap<String, String>();
    parameters.put("project_id", projectKey);
    parameters.put("status_id", "open");
    if (projectDate != null) {
      parameters.put("created_on", "<=" + date);
    }
    List<Issue> issues = redmineMgr.getIssueManager().getIssues(parameters);

    //If a date was specified, also get the issues that have been closed since
    if (projectDate != null) {
      parameters.put("status_id", "closed");
      parameters.put("created_on", "<=" + date);
      parameters.put("closed_on", ">=" + date);
      issues = ListUtils.union(issues, redmineMgr.getIssueManager().getIssues(parameters));
    }
    return issues;
  }

  public Map<String, Integer> collectProjectIssuesByPriority(final String projectKey, final Optional<Date> projectDate) throws RedmineException {

    List<Issue> issues = collectProjectIssues(projectKey, projectDate);
    Map<String, Integer> issuesByPriority = Maps.newHashMap();

    for (Issue issue : issues) {
      String priority = issue.getPriorityText();
      if (issuesByPriority.containsKey(priority)) {
        issuesByPriority.put(priority, issuesByPriority.get(priority) + 1);
      } else {
        issuesByPriority.put(priority, 1);
      }
    }
    return issuesByPriority;
  }

  @Override
  public Class<? extends Annotation> annotationType() {
    return null;
  }
}
