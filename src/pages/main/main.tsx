import './main.scss';
import * as React from 'react';
// import searchIcon from './icons/search.svg';
import Button from 'components/botton/button';

const Templates = [{title: 'custom'}, {title: 'transport'}, {title: 'cv'}, {title: 'medical'}, {title: 'contacts'}];
const Pages: string[] = [];

export default class MainPage extends React.Component {
    private _renderTemplate(title: string): React.ReactNode {
        return (
            <div className="template" key={title}>
                <div className="template-content">
                    
                </div>
                <div className="template-title">
                    {title}
                </div>
            </div>
        );
    }

    public render() {
        return (
            <div className="main-page">
                <div className="main-page-header">
                    <div className="main-page-header-title">Velox</div>
                    <Button text="Profile" type="air"/>
                </div>
                <div className="main-page-templates">
                    <div className="main-page-templates-title">
                        Templates
                    </div>
                    <div className="main-page-templates-content">
                        {Templates.map(({title}) => this._renderTemplate(title))}
                    </div>
                </div>
                <div className="main-page-pages">
                    <div className="main-page-pages-header">
                        <div className="main-page-pages-header-left-block">
                            <div className="main-page-pages-header-title">
                                Pages
                            </div>
                            <div>
                                searchIcon
                            </div>
                        </div>
                        <div>
                            btn
                        </div>
                    </div>
                    <div className="main-page-pages-content">
                        {Pages.length ? 'xuy' : 'You dont have any pages yet'}
                    </div>
                </div>
            </div>
        );
    }
}