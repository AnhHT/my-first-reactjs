import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { actions as manageCollection } from '../../redux/modules/mngCollection'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
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
    getCollection: PropTypes.func,
    onEdit: PropTypes.bool
  };

  constructor (props) {
    super(props)
    this.state = {
      onEdit: false,
      title: '',
      imageUrl: ''
    }
  }

  componentWillMount () {
    this.props.getCollection()
  }

  onEditHandle (e) {
    e.preventDefault()
    this.setState({onEdit: !this.state.onEdit, title: '', imageUrl: ''})
  }

  onSaveHandle (e) {
    e.preventDefault()
    console.log(this.state)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    let baseUrl = 'http://www.cityme.asia'
    let onEdit = this.state.onEdit
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
        <div className={classes.centerSection}>
          <h2>Update collection</h2>
          <div className={classes.actionButton}>
            { onEdit ? <Button label='Save' raised primary onClick={::this.onSaveHandle} /> : <Button label='Add' raised primary onClick={::this.onEditHandle}/>}
            {' '}
            <Button label='Cancel' raised accent onClick={::this.onEditHandle}/>
          </div>
          { onEdit ? (<div className={classes.actionForm}>
              <section>
                <form onChange={::this.handleChange}>
                  <Input type='text' label='Title' name='title' value={this.state.title}/>
                  <Input type='text' label='Image Url' name='imageUrl' value={this.state.imageUrl}/>
                </form>
              </section>
            </div>): ''}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, manageCollection)(RequestView)
