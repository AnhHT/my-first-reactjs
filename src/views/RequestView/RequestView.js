import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { actions as manageCollection } from '../../redux/modules/mngCollection'
import classes from './RequestView.scss'

const mapStateToProps = (state) => ({
  isFetching: state.mngCollection.isFetching,
  isFetch: state.mngCollection.isFetch,
  data: state.mngCollection.myCollection,
  statusText: state.mngCollection.statusText
})

export class RequestView extends Component {

  static propTypes = {
    isFetching: PropTypes.bool,
    isFetch: PropTypes.bool,
    data: PropTypes.object,
    getCollection: PropTypes.func
  };

  componentWillMount () {
    this.props.getCollection()
  }

  render () {
    let baseUrl = 'http://www.cityme.asia'
    return (
      <div className={classes.container}>
        <h1>Bộ sưu tập</h1>
        <ul className={classes.mtHighMedium}>
        {
          this.props.isFetch ? this.props.data.value.map(item =>
              <li className={classes.collectionLocalBizsItem} style={{ backgroundImage: 'url(' + baseUrl + item.imageUrl + ')' }} key={item.linkTo}>
                <a className={classes.collectionLocalBizsLink} href={baseUrl + item.linkTo}>
                  <div>
                    <div className={classes.collectionLocalBizsTitle}>
                      {item.title}
                    </div>
                    <div className={classes.mtTiny} style={{ opacity: 0.85 }}>
                      <span>{item.count}</span>
                      <span> địa điểm</span>
                    </div>
                  </div>
                </a>
              </li>
            ) : <h4>Failed</h4>
        }
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, manageCollection)(RequestView)
