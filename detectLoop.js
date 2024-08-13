const detectLoop = (data, period = 10) => {
  const knownKeys = new Set();
  const keyInstances = {};

  let isLoop = false;

  for (let i = 0; i < data.length; i++) {
    const map = data[i];
    const key = map.key;

    knownKeys.add(key);

    if (!keyInstances[key]) {
      keyInstances[key] = [i];
    } else {
      keyInstances[key].push(i);
    }
  }

  knownKeys.forEach((key) => {
    if (isLoop) {
      return;
    }

    const instances = keyInstances[key];

    if (instances < 2) {
      return;
    }

    if (withinPeriod(instances, period)) {
      isLoop = true;
    }
  });

  return isLoop;
};

function withinPeriod(instances, period) {
  for (let i = 1; i < instances.length; i++) {
    if (Math.abs(instances[i] - instances[i - 1]) > period) {
      return false;
    }
  }
  return true;
}

module.exports = detectLoop;
