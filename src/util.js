// @flow
/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

export function propertiesChanged(
  props: {},
  nextProps: {},
  properties: Array<string>
): boolean {
  let hasDifference = false;
  _.forEach(properties, (property: string): boolean => {
    if (
      !_.isEqual(_.get(props, property, null), _.get(nextProps, property, null))
    ) {
      hasDifference = true;
      return false;
    }
    return true;
  });
  return hasDifference;
}
