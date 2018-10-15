import './loader.scss';
import * as React from "react";
import * as QRCode from 'qrcode.react';

interface Props {
    size: 'small' | 'normal' | 'large';
}

const sizes = {
    small: 30,
    normal: 70,
    large: 150
}

export default class Loader extends React.Component<Props> {
    interval: any = null;
    state = {
        value: 'randomstr'
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setState({value: Math.random().toString(36).substring(7)}), 400);
    }
    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    public render() {
        return (
            <div className="loader">
                <QRCode value={this.state.value} bgColor="#2d2d2d" fgColor="#ffd900" size={sizes[this.props.size]}/>
                <div className="loader__text">
                    Loading...
                </div>
            </div>
        );
    }
}
