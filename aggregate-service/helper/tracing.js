const { initTracer: initJaegerTracer } = require("jaeger-client");

let jaegerCollectorUrl = process.env.JAEGER_COLLECTOR_URL || '34.67.53.121' ; 

module.exports.initTracer = serviceName => {
  const config = {
    serviceName: serviceName,
    sampler: {
      type: "const",
      param: 1,
    },
    reporter: {
      logSpans: true,
      collectorEndpoint: `http://${jaegerCollectorUrl}:14268/api/traces`
    },
  };
  const options = {
    logger: {
      info(msg) {
        console.log("INFO ", msg);
      },
      error(msg) {
        console.log("ERROR", msg);
      },
    },
  };
  return initJaegerTracer(config, options);
};
