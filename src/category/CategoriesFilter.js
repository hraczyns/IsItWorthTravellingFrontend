import {categoryTypes} from "./CategoryTypes";
import CheckboxTree from 'react-checkbox-tree';
import {Component} from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import "../css/category.css";

export const DEFAULT_KINDS = ['lighthouses','skyscrapers','bridges', 'historic_architecture', 'towers', 'museums', 'theatres_and_entertainments', 'urban_environment', 'archaeology', 'burial_places', 'fortifications', 'historical_places', 'monuments_and_memorials', 'industrial_facilities', 'beaches', 'geological_formations', 'glaciers', 'islands', 'natural_springs', 'nature_reserves', 'water', 'other', 'religion'];

class CategoriesFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: ['all']
        };
    }

    render() {
        return (
            <div className={"categories"}>
                <button onClick={this.props.onFilterClick}>Filter</button>
                <CheckboxTree
                    icons={{
                        check: <span className="rct-icon rct-icon-check"/>,
                        uncheck: <span className="rct-icon rct-icon-uncheck"/>,
                        halfCheck: <span className="rct-icon rct-icon-half-check"/>,
                        expandClose: <span className="rct-icon rct-icon-expand-close"/>,
                        expandOpen: <span className="rct-icon rct-icon-expand-open"/>,
                        expandAll: <span className="rct-icon rct-icon-expand-all"/>,
                        collapseAll: <span className="rct-icon rct-icon-collapse-all"/>,
                        parentClose: <span/>,
                        parentOpen: <span/>,
                        leaf: <span/>,
                    }}
                    nodes={categoryTypes}
                    checked={this.props.kinds}
                    expanded={this.state.expanded}
                    onCheck={(checked) => this.props.onChange(checked)}
                    onExpand={(expanded) => this.setState({expanded})}
                    checkModel={'all'}
                />
            </div>
        );
    }
}

export default CategoriesFilter;