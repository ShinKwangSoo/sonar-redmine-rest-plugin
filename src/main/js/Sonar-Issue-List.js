import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import SonarIssueList from './components/SonarIssueList';

window.registerExtension('redmine/Sonar-Issue-List', options=> {
    const {el} = options;

    render(
        <SonarIssueList
            project={options.component}
        />, el
    );

    return () => unmountComponentAtNode(el);
});
