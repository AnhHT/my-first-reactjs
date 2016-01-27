import React from 'react'
import { List, ListItem } from 'react-toolbox'
import style from './style'

const SidebarNavigation = (props) => {
  let className = style.root
  return (
  <aside className={className}>
    <List selectable ripple>
      <ListItem
        avatar='https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg'
        caption='Dr. Manhattan'
        legend="Jonathan 'Jon' Osterman"
        rightIcon='star' />
      <ListItem
        avatar='https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg'
        caption='Ozymandias'
        legend='Adrian Veidt'
        rightIcon='star' />
      <ListItem
        avatar='https://dl.dropboxusercontent.com/u/2247264/assets/r.jpg'
        caption='Rorschach'
        legend='Walter Joseph Kovacs'
        rightIcon='star' />
    </List>
  </aside>
  )
}

SidebarNavigation.propTypes = {
  active: React.PropTypes.bool,
  className: React.PropTypes.string
}

SidebarNavigation.defaultProps = {
  activeClassName: '',
  className: ''
}

export default SidebarNavigation
