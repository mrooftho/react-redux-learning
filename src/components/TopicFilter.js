import React, {Component} from 'react';
import _ from 'lodash';

class TopicFilter extends Component{
  render() {
    return (
      <div className={this.props.className}>
        {this.renderFilter('all', 'All')}
        {_.map(this.props.topics, (topic, topicId) => this.renderFilter(topicId, topic.title))}
      </div>
    );
  }

  renderFilter(id, label) {
    const className = this.props.selected === id ? 'selected' : undefined;
    return (
      <button
        key={id}
        className={className}
        onClick={() => this.onFilterClick(id)}>
        {label}
      </button>
    );
  }

  onFilterClick(id) {
    if (id === this.props.selected) return;
    this.props.onChanged(id);
  }
}

export default TopicFilter;