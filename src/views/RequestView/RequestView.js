import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { actions as manageCollection } from '../../redux/modules/mngCollection'
import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { reduxForm } from 'redux-form'
import classes from './RequestView.scss'

const mapStateToProps = (state) => ({
  isFetching: state.mngCollection.isFetching,
  isFetch: state.mngCollection.isFetch,
  data: state.mngCollection.myCollection,
  statusText: state.mngCollection.statusText
})

const form = reduxForm({
  form: 'login',
  fields: ['title', 'imageUrl'],
  validate (state) {
    const errors = {}
    if (!state.title) {
      errors.title = 'Title is required'
    }

    if (!state.imageUrl) {
      errors.imageUrl = 'Url is required'
    }

    return errors
  }
})

export class RequestView extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    isFetch: PropTypes.bool,
    data: PropTypes.object,
    getCollection: PropTypes.func,
    fields: PropTypes.object.isRequired,
    resetForm: PropTypes.func.isRequired,
    valid: PropTypes.bool
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

  onAddHandle (e) {
    e.preventDefault()
    this.setState({onEdit: !this.state.onEdit, title: '', imageUrl: ''})
    this.props.resetForm()
  }

  onCancelHandle (e) {
    e.preventDefault()
    if (this.state.onEdit) {
      this.setState({onEdit: !this.state.onEdit, title: '', imageUrl: ''})
      this.props.resetForm()
    }
  }

  onSaveHandle (e) {
    e.preventDefault()
    if (this.props.valid) {
      this.props.data.value = [...this.props.data.value, {title: this.state.title, imageUrl: this.state.imageUrl, linkTo: this.state.imageUrl}]
      this.setState({onEdit: !this.state.onEdit, title: '', imageUrl: ''})
      this.props.resetForm()
    }
  }

  onRemoveHandle (e) {
    e.preventDefault()
    let idx = e.target.id - 1
    this.props.data.value = [...this.props.data.value.slice(0, idx), ...this.props.data.value.slice(idx + 1)]
    this.props.resetForm()
  }

  onEditHandle (e) {
    e.preventDefault()
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    let baseUrl = 'http://www.cityme.asia'
    let onEdit = this.state.onEdit
    let {fields: {title, imageUrl}} = this.props
    let nextId = 0
    return (
      <div className={classes.container}>
        <h1>Bộ sưu tập</h1>
        <ul className={classes.mtHighMedium}>
        {
          this.props.isFetch ? this.props.data.value.map(item =>
              <li className={classes.collectionLocalBizsItem} style={{ backgroundImage: 'url(' + baseUrl + item.imageUrl + ')' }} key={item.linkTo} id={nextId++}>
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
                <Button icon='edit' className={classes.editButton} floating primary mini />
                <Button icon='remove' className={classes.deleteButton} floating accent mini onClick={::this.onRemoveHandle} id={nextId}/>
              </li>
            ) : <h4>Failed</h4>
        }
        </ul>
        <div className={classes.centerSection}>
          <h2>Update collection</h2>
          <div className={classes.actionButton}>
            { onEdit ? <Button label='Save' raised primary onClick={::this.onSaveHandle} /> : <Button label='Add' raised primary onClick={::this.onAddHandle}/>}
            {' '}
            <Button label='Cancel' raised accent onClick={::this.onCancelHandle}/>
          </div>
          { onEdit ? (<div className={classes.actionForm}>
              <section>
                <form onChange={::this.handleChange}>
                  <Input type='text' label='Title' {...title} />
                  <Input type='text' label='Image Url' {...imageUrl} />
                </form>
              </section>
            </div>) : ''}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, manageCollection)(form(RequestView))
