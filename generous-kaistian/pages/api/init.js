import { init } from '../../components/tables/init';

export default async function InitDB(req, res) {
  init();
}
