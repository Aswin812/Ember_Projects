import Component from '@glimmer/component';

export default class NavBarComponent extends Component {
    getRouteName(option) {
        return `admin-page.${option.toLowerCase().replace(' ', '-')}`;
    }
}