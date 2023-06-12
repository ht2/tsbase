import { Logger } from 'winston';
import Translator from '../translatorFactory/Translator';

interface Config {
  readonly logger: Logger;
  readonly translator: Translator;
  readonly customRoute: string;
  readonly customRouteText: string;
  readonly morganDirectory: string;
  readonly bodyParserLimit: string;
}

export default Config;
