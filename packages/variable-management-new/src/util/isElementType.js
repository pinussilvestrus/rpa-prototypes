export const isProcess = (element) => {
  return element.type === 'bpmn:Process';
};

export const isTask = (element) => {
  return element.type === 'bpmn:ServiceTask' || element.type === 'bpmn:SendTask';
};

export const isStartEvent = (element) => {
  return element.type === 'bpmn:StartEvent';
};