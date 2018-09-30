import './constructor.scss';
import * as React from 'react';
import Header from 'components/header/header';

export default class Constructor extends React.Component {
    public render(): React.ReactNode {
        return (
            <>
                <Header />
                <div className="constructor">
                        <div className="constructor__content">

                        </div>
                        <div className="constructor__menu">

                        </div>
                </div>
            </>
        );
    }
}
