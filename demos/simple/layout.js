



import Inferno from 'inferno';
import Component from 'inferno-component';

class Layout extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                <div class="copyright">Made with ♥ by <a href="https://github.com/sheweichun" target="_blank">sheweichun</a>.</p>
            </div>
        );
    }
}

export default Layout;