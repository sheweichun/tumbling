



import Inferno from 'inferno';
import Component from 'inferno-component';

class Layout extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;