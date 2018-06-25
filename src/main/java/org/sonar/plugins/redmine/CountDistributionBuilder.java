package org.sonar.plugins.redmine;


import com.google.common.collect.Multiset;
import com.google.common.collect.TreeMultiset;
import org.sonar.api.SonarRuntime;
import org.sonar.api.batch.fs.FileSystem;
import org.sonar.api.batch.fs.InputFile;
import org.sonar.api.batch.fs.InputModule;
import org.sonar.api.batch.measure.Metric;
import org.sonar.api.batch.rule.ActiveRules;
import org.sonar.api.batch.sensor.SensorContext;
import org.sonar.api.batch.sensor.coverage.NewCoverage;
import org.sonar.api.batch.sensor.cpd.NewCpdTokens;
import org.sonar.api.batch.sensor.error.NewAnalysisError;
import org.sonar.api.batch.sensor.highlighting.NewHighlighting;
import org.sonar.api.batch.sensor.issue.NewIssue;
import org.sonar.api.batch.sensor.measure.NewMeasure;
import org.sonar.api.batch.sensor.symbol.NewSymbolTable;
import org.sonar.api.config.Configuration;
import org.sonar.api.config.Settings;
import org.sonar.api.utils.Version;

import java.io.Serializable;

public class CountDistributionBuilder implements SensorContext {

    private final Metric metric;
    private final Multiset countBag = TreeMultiset.create();

    public CountDistributionBuilder(Metric metric) {
           this.metric = metric;
    }

    public CountDistributionBuilder add(Object value, int count) {
        if (count != 0)  {
            if (this.countBag.add(value, count) == 0) {
                // hack
                this.countBag.add(value, 1);
            }
        }
        return this;
    }

    public CountDistributionBuilder add(Object value) {
        return add(value, 1);
    }
/*
    public CountDistributionBuilder addZero(Object value) {
        if (!countBag.contains(value)) {
            countBag.add(value, 1);
        }
        return this;
    }*/

    /**
     * Adds an existing Distribution to the current one.
     * It will create the entries if they don't exist.
     * Can be used to add the values of children resources for example
     *
     * @param measure the measure to add to the current one
     * @return the current object
     */
   /* public CountDistributionBuilder add(@Nullable SensorContext measure) {
        if (measure != null) {
            Map<String, String> map = KeyValueFormat.parse(measure.newMeasure());
            for (Map.Entry<String, String> entry : map.entrySet()) {
                String key = entry.getKey();
                int value = StringUtils.isBlank(entry.getValue()) ? 0 : Integer.parseInt(entry.getValue());
                if (NumberUtils.isNumber(key)) {
                    add(NumberUtils.toInt(key), value);
                } else {
                    add(key, value);
                }
            }
        }
        return this;
    }*/

    /**
     * @return whether the current object is empty or not
     */
    public boolean isEmpty() {
        return countBag.isEmpty();
    }

    /**
     * Resets all entries to zero
     *
     * @return the current object
     */
    public CountDistributionBuilder clear() {
        countBag.clear();
        return this;
    }

    /**
     * Shortcut for <code>build(true)</code>
     *
     * @return the built measure
     */
/*
    @Override
    public Measure build() {
        return build(true);
    }

    public Measure build(boolean allowEmptyData) {
        if (!isEmpty() || allowEmptyData) {
            return new Measure(metric, MultisetDistributionFormat.format(countBag));
        }
        return null;
    }
*/

    @Override
    public Settings settings() {
        return null;
    }

    @Override
    public Configuration config() {
        return null;
    }

    @Override
    public FileSystem fileSystem() {
        return null;
    }

    @Override
    public ActiveRules activeRules() {
        return null;
    }

    @Override
    public InputModule module() {
        return null;
    }

    @Override
    public Version getSonarQubeVersion() {
        return null;
    }

    @Override
    public SonarRuntime runtime() {
        return null;
    }

    @Override
    public boolean isCancelled() {
        return false;
    }

    @Override
    public <G extends Serializable> NewMeasure<G> newMeasure() {
        return null;
    }

    @Override
    public NewIssue newIssue() {
        return null;
    }

    @Override
    public NewHighlighting newHighlighting() {
        return null;
    }

    @Override
    public NewSymbolTable newSymbolTable() {
        return null;
    }

    @Override
    public NewCoverage newCoverage() {
        return null;
    }

    @Override
    public NewCpdTokens newCpdTokens() {
        return null;
    }

    @Override
    public NewAnalysisError newAnalysisError() {
        return null;
    }

    @Override
    public void addContextProperty(String key, String value) {

    }

    @Override
    public void markForPublishing(InputFile inputFile) {

    }
}

