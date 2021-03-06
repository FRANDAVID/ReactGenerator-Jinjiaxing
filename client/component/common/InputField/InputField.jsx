/**
 * Created by zengruofan on 16/6/12.
 * Edit by jinjiaxing on 16/6/30.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './_inputField.scss';

class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIcon: false,
            value: ''
        }
    }

    static propTypes = {
        type: PropTypes.oneOf(['text', 'password', 'number']),
        placeholder: PropTypes.string,
        className: PropTypes.string,
        iconDisable: PropTypes.bool,
        isDisable: PropTypes.bool,
        autoFocus: PropTypes.bool,
        onChangeHandler: PropTypes.func,
        onBlur: PropTypes.func,
        formatText: PropTypes.func,
        maxLength: PropTypes.number,
        defaultValue: PropTypes.string
    }

    static defaultProps = {
        type: 'text',
        // 文字内容
        placeholder: '请输入',
        // 自定义style
        className: '',
        // 图标显示
        iconDisable: true,
        // false 按钮不启用,true按钮可用
        isDisable: false,
        // 跳转后 获取焦点
        autoFocus: false,
        // 限制最大可输入数
        maxLength: 100,
        // onChange事件handler
        onChangeHandler: ()=> {
        },
        // 格式化文本方法
        formatText: ()=> {
        },
        // 焦点移开事件
        onBlur: ()=> {
        }
    }

    /**
     * 输入时文字变化处理事件
     * @param e
     */
    textChange(e) {
        let value = e.target.value;

        this.props.onChangeHandler(value);

        if (this.props.formatText) {
            value = this.props.formatText(value)
        }

        if (e.target.value === '') {
            this.setState({showIcon: false, value: value})
        } else {
            this.setState({showIcon: true, value: value})
        }

    }

    clearInput(event) {
        // 这里的this为InputField对象
        this.refs.inputField.focus();
        this.refs.inputField.value = '';
        this.setState({value: ''});
        if (this.props.clearCallback) {
            this.props.clearCallback();
        }
    }

    componentWillMount() {
        if (this.props.defaultValue) {
            this.setState({
                value: this.props.defaultValue
            });
        }
    }
    
    render() {
        let autoFocus = '';
        if (this.props.autoFocus) {
            autoFocus = 'autofocus';
        }

        let required = 'required';
        if (!this.props.required) {
            required = '';
        }

        let clearContain = [];
        if (this.props.iconDisable) {
            if (this.state.showIcon) {
                clearContain.push(<div key='clearContain' className="clear_container"
                                       onClick={this.clearInput.bind(this)}>
                    <div className="input_field_clear"></div>
                </div>);
            }
        }

        const {leftIconName} = this.props;

        return (
            <div className="input_field_component">
                {
                    leftIconName ? <span className={leftIconName}></span> : ''
                }
                <input className={`input_field ${this.props.className}`}
                       type={this.props.type}
                       placeholder={this.props.placeholder}
                       autoFocus={autoFocus}
                       ref="inputField"
                       onChange={this.textChange.bind(this)}
                       value={this.state.value}
                       onBlur={this.props.onBlur.bind(this)}
                       maxLength={this.props.maxLength}
                       disabled={this.props.isDisable}
                />
                {clearContain}
            </div>
        );
    }
}

export default InputField;

