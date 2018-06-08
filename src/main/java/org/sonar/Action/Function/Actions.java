package org.sonar.Action.Function;

import org.sonar.api.ServerExtension;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class Actions implements ServerExtension {

    private final List<Action> actions;

    public Actions() {
        actions = newArrayList();
    }

    public Action add(String actionKey) {
        Action action = new Action(actionKey);
        this.actions.add(action);
        return action;
    }

    public List<Action> list() {
        return actions;
    }
}
