package org.sonar.Action.Function;

import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import com.google.common.collect.ImmutableList;
import org.sonar.api.issue.Issue;
import org.sonar.api.issue.condition.Condition;

import java.util.List;

import static org.sonar.api.internal.google.common.collect.Lists.newArrayList;

public class Action {
    private final String key;
    private final List<Condition> conditions;
    private final List<Function> functions;

    Action(String key) {
        Preconditions.checkArgument(!Strings.isNullOrEmpty(key), "Action key must be set");
        this.key = key;
        this.conditions = newArrayList();
        this.functions = newArrayList();
    }

    public String key() {
        return key;
    }

    public Action setConditions(Condition... conditions) {
        this.conditions.addAll(ImmutableList.copyOf(conditions));
        return this;
    }

    public List<Condition> conditions() {
        return conditions;
    }

    public Action setFunctions(Function... functions) {
        this.functions.addAll(ImmutableList.copyOf(functions));
        return this;
    }

    public List<Function> functions() {
        return functions;
    }

    public boolean supports(Issue issue) {
        for (Condition condition : conditions) {
            if (!condition.matches(issue)) {
                return false;
            }
        }
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Action that = (Action) o;
        if (!key.equals(that.key)) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        return key.hashCode();
    }

    @Override
    public String toString() {
        return key;
    }

}
