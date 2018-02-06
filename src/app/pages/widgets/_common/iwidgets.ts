
interface IWidgets {

    run();

    stop();

    toggleConfigMode();

    initializeProperties();

    updateProperties(updatedProperties: any);

    updateData(data: any[]);

    handleError(error: any);

    remove();

    showGadgetControls(enable: boolean);

    configureGadget(instanceId: number, config: any);


}
