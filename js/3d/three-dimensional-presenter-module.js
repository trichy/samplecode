var threeDimensionalPresenterModule = (function () {
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    var WEBSITE_BASE_URI = "";
    var API_BASE_URI = "";
    var loader;
    var canvas, stats, clock;
    var camera, scene, renderer, enclosure, controlPanelAsBackground, logo;

    var initialized = false;

    var inputModel = {
        "MaximumBankHeight": $('#tbMaxBankHeight').val(),
        "MaximumBankWidth": $('#tbMaxBankWidth').val(),
        "QtyFilter24x12": $('#cb24x12').prop('checked'),
        "QtyFilter12x24": $('#cb12x24').prop('checked'),
        "QtyFilter20x20": $('#cb20x20').prop('checked'),
        "QtyFilter24x20": $('#cb24x20').prop('checked'),
        "QtyFilter20x24": $('#cb20x24').prop('checked'),
        "QtyFilter24x24": $('#cb24x24').prop('checked'),
        "QtyFilter20x16": $('#cb20x16').prop('checked'),
        "QtyFilter16x20": $('#cb16x20').prop('checked')
    }

    var viewModel = {
        "Errors": [],
        "FilterBankHeight": 120,
        "FilterBankWidth": 88,
        "FilterBankArea": 10560,
        "FilterBankFilterQtyHigh": 5,

        "FilterBankAFilterHeight": 24,
        "FilterBankAFilterWidth": 24,
        "FilterBankAQtyFilterHigh": 5,
        "FilterBankAQtyFilterWide": 2,

        "FilterBankBFilterHeight": 24,
        "FilterBankBFilterWidth": 20,
        "FilterBankBQtyFilterHigh": 5,
        "FilterBankBQtyFilterWide": 2,

        "FilterBankCFilterHeight": 0,
        "FilterBankCFilterWidth": 0,
        "FilterBankCQtyFilterHigh": 0,
        "FilterBankCQtyFilterWide": 0
    }

    var filterBankLowerLeftCoordinates = { "x": getFilterBankStartingX(viewModel.FilterBankWidth), "y": getFilterBankStartingY(viewModel.FilterBankHeight) };

    var filterBanks = {
        "filterBankA": [],
        "filterBankB": [],
        "filterBankC": []
    }

    var nextFilterBankStartPosition = {
        "x": filterBankLowerLeftCoordinates.x,
        "y": filterBankLowerLeftCoordinates.y
    };

    var FilterBankBStartPosition = {
        "x": filterBankLowerLeftCoordinates.x,
        "y": filterBankLowerLeftCoordinates.y
    };

    function configureFilterBanks() {

        //validate by making sure at least 1 checkbox is selected
        //width cannot exceed height

        //look at 90 x 140: filter bank B should go to the right of filter bank A, not above it

        inputModel = {
            "MaximumBankHeight": $('#tbMaxBankHeight').val(),
            "MaximumBankWidth": $('#tbMaxBankWidth').val(),
            "QtyFilter24x12": $('#cb24x12').prop('checked'),
            "QtyFilter12x24": $('#cb12x24').prop('checked'),
            "QtyFilter20x20": $('#cb20x20').prop('checked'),
            "QtyFilter24x20": $('#cb24x20').prop('checked'),
            "QtyFilter20x24": $('#cb20x24').prop('checked'),
            "QtyFilter24x24": $('#cb24x24').prop('checked'),
            "QtyFilter20x16": $('#cb20x16').prop('checked'),
            "QtyFilter16x20": $('#cb16x20').prop('checked')
        }

        $.post(API_BASE_URI + '/api/filter/maximum-area-fit', inputModel, function (data) {
            if (data === "") {
                console.log('no data');
            } else {
                viewModel = data;

                $.each(filterBanks.filterBankA, function (index, filter) {
                    scene.remove(filter);
                });

                filterBanks.filterBankA = [];

                $.each(filterBanks.filterBankB, function (index, filter) {
                    scene.remove(filter);
                });

                filterBanks.filterBankB = [];

                $.each(filterBanks.filterBankC, function (index, filter) {
                    scene.remove(filter);
                });

                filterBanks.filterBankC = [];

                ////these are returned length x width recommendations
                //enclosure.position.x = getEnclosurePositionX(viewModel.FilterBankWidth);
                //enclosure.position.y = getEnclosurePositionY(viewModel.FilterBankHeight);

                //these are what the user entered for length x width
                enclosure.position.x = getEnclosurePositionX(inputModel.MaximumBankWidth);
                enclosure.position.y = getEnclosurePositionY(inputModel.MaximumBankHeight);

                enclosure.scale.x = enclosure.position.y * .1;
                enclosure.scale.z = -(enclosure.position.x * .067);

                //reset starting position for filters
                filterBankLowerLeftCoordinates = { "x": getFilterBankStartingX(viewModel.FilterBankWidth), "y": getFilterBankStartingY(viewModel.FilterBankHeight) };

                nextFilterBankStartPosition = {
                    "x": filterBankLowerLeftCoordinates.x,
                    "y": filterBankLowerLeftCoordinates.y
                };

                FilterBankBStartPosition = {
                    "x": filterBankLowerLeftCoordinates.x,
                    "y": filterBankLowerLeftCoordinates.y
                };

                defineFilterBanks();

                displayValuesInUi();

                if (viewModel.FilterBankAQtyFilterHigh + viewModel.FilterBankBQtyFilterHigh
                    + viewModel.FilterBankCQtyFilterHigh > viewModel.FilterBankFilterQtyHigh) {
                    //alert('Invalid results.\nTry swapping the height and width inputs or adding more screen size options.');
                }

                //console.log(data);
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            //alert(xhr.responseText);
            alert('API connection failure');
        });
    }

    function displayValuesInUi() {
        $("#dtActualBankHeight").text(viewModel.FilterBankHeight + "\"");
        $("#dtActualBankWidth").text(viewModel.FilterBankWidth + "\"");

        var qty = 0;

        qty = getFilterSizeVisibleQuantity(24, 24);
        qty > 0 ? $("#dl24x24").show() && $("#dd24x24").text(qty) : $("#dl24x24").hide();

        qty = getFilterSizeVisibleQuantity(12, 24);
        qty > 0 ? $("#dl12x24").show() && $("#dd12x24").text(qty) : $("#dl12x24").hide();

        qty = getFilterSizeVisibleQuantity(24, 12);
        qty > 0 ? $("#dl24x12").show() && $("#dd24x12").text(qty) : $("#dl24x12").hide();

        qty = getFilterSizeVisibleQuantity(16, 20);
        qty > 0 ? $("#dl16x20").show() && $("#dd16x20").text(qty) : $("#dl16x20").hide();

        qty = getFilterSizeVisibleQuantity(20, 16);
        qty > 0 ? $("#dl20x16").show() && $("#dd20x16").text(qty) : $("#dl20x16").hide();

        qty = getFilterSizeVisibleQuantity(20, 20);
        qty > 0 ? $("#dl20x20").show() && $("#dd20x20").text(qty) : $("#dl20x20").hide();

        qty = getFilterSizeVisibleQuantity(24, 20);
        qty > 0 ? $("#dl24x20").show() && $("#dd24x20").text(qty) : $("#dl24x20").hide();

        qty = getFilterSizeVisibleQuantity(20, 24);
        qty > 0 ? $("#dl20x24").show() && $("#dd20x24").text(qty) : $("#dl20x24").hide();
    }

    function getFilterSizeVisibleQuantity(width, height) {
        var quantity = 0;

        if (viewModel.FilterBankAFilterHeight === height && viewModel.FilterBankAFilterWidth === width
            && viewModel.FilterBankAQtyFilterHigh > 0 && viewModel.FilterBankAQtyFilterWide > 0) {

            quantity += viewModel.FilterBankAQtyFilterHigh * viewModel.FilterBankAQtyFilterWide;
        }

        if (viewModel.FilterBankBFilterHeight === height && viewModel.FilterBankBFilterWidth === width
            && viewModel.FilterBankBQtyFilterHigh > 0 && viewModel.FilterBankBQtyFilterWide > 0) {

            quantity += viewModel.FilterBankBQtyFilterHigh * viewModel.FilterBankBQtyFilterWide;
        }

        if (viewModel.FilterBankCFilterHeight === height && viewModel.FilterBankCFilterWidth === width
            && viewModel.FilterBankCQtyFilterHigh > 0 && viewModel.FilterBankCQtyFilterWide > 0) {

            quantity += viewModel.FilterBankCQtyFilterHigh * viewModel.FilterBankCQtyFilterWide;
        }

        return quantity;
    }

    function getModelLengthByInches(inches, index) {
        var blockLength24 = 2.00;
        switch (inches) {
            case 24:
                blockLength24 = 2.00;
                break;
            case 20:
                blockLength24 = blockLength24 * (20 / 24);
                break;
            case 16:
                blockLength24 = blockLength24 * (16 / 24);
                break;
            case 12:
                blockLength24 = blockLength24 * (12 / 24);
                break;
            default:
                blockLength24 = 0;
        }

        return blockLength24 + (blockLength24 * index);
    }

    function getModelScaleByInches(inches) {
        var blockLength24 = 24;

        return (inches / blockLength24) * .1;
    }

    function getModelOffsetByInches(inches) {
        return 2 - getModelLengthByInches(inches, 0)
    }

    function getEnclosurePositionX(width) {
        return (width / 120) * -4.80;
    }

    function getEnclosurePositionY(height) {
        return (height / 96) * 3.685;
    }

    function getFilterBankStartingX(width) {
        return -4.95 + ((120 - width) * .0412);
    }

    function getFilterBankStartingY(height) {
        return -2.00 + ((96 - height) * .0412);
    }


    function defineFilterBanks() {
        // Filter Bank A
        for (var h = 0; h < viewModel.FilterBankAQtyFilterHigh; h++) {
            for (var w = 0; w < viewModel.FilterBankAQtyFilterWide; w++) {
                loader.load(WEBSITE_BASE_URI + '/js/3d/models/filter-bank/filter/model.dae', function (collada) {
                    //filter for enclosure
                    var filter = collada.scene;

                    filter.position.x = 0.0;
                    filter.position.y = 0.0;
                    filter.position.z = 0;

                    filter.scale.x = .1;
                    filter.scale.y = .1;
                    filter.scale.z = .15;

                    filter.rotation.x = (Math.PI / 2) * 2;
                    filterBanks.filterBankA.push(filter);
                });
            }
        }

        // Filter Bank B
        for (var h = 0; h < viewModel.FilterBankBQtyFilterHigh; h++) {
            for (var w = 0; w < viewModel.FilterBankBQtyFilterWide; w++) {
                loader.load(WEBSITE_BASE_URI + '/js/3d/models/filter-bank/filter/model.dae', function (collada) {
                    //filter for enclosure
                    var filter = collada.scene;

                    filter.position.x = 0.0;
                    filter.position.y = 0.0;
                    filter.position.z = 0;

                    filter.scale.x = .1;
                    filter.scale.y = .1;
                    filter.scale.z = .15;

                    filter.rotation.x = (Math.PI / 2) * 2;
                    filterBanks.filterBankB.push(filter);
                });
            }
        }

        // Filter Bank C
        for (var h = 0; h < viewModel.FilterBankCQtyFilterHigh; h++) {
            for (var w = 0; w < viewModel.FilterBankCQtyFilterWide; w++) {
                loader.load(WEBSITE_BASE_URI + '/js/3d/models/filter-bank/filter/model.dae', function (collada) {
                    //filter for enclosure
                    var filter = collada.scene;

                    filter.position.x = 0.0;
                    filter.position.y = 0.0;
                    filter.position.z = 0;

                    filter.scale.x = .1;
                    filter.scale.y = .1;
                    filter.scale.z = .15;

                    filter.rotation.x = (Math.PI / 2) * 2;
                    filterBanks.filterBankC.push(filter);
                });
            }
        }
    }

    function addFiltersToScene() {
        var startingY = 0;
        var loopIndex = 0;

        for (var h = 0; h < viewModel.FilterBankAQtyFilterHigh; h++) {
            for (var w = 0; w < viewModel.FilterBankAQtyFilterWide; w++) {
                var filter = filterBanks.filterBankA[loopIndex];

                filter.scale.x = getModelScaleByInches(viewModel.FilterBankAFilterWidth);
                filter.scale.y = getModelScaleByInches(viewModel.FilterBankAFilterHeight);

                filter.position.x = filterBankLowerLeftCoordinates.x
                    + getModelLengthByInches(viewModel.FilterBankAFilterWidth, w - 1);

                if (h === 0) {
                    if (w === 0) {
                        startingY = nextFilterBankStartPosition.y
                            - (2 - getModelLengthByInches(viewModel.FilterBankAFilterHeight, 0));
                    }

                    filter.position.y = startingY;
                }
                else {
                    filter.position.y = startingY + getModelLengthByInches(viewModel.FilterBankAFilterHeight, h - 1);
                }

                nextFilterBankStartPosition.y = filterBankLowerLeftCoordinates.y + getModelLengthByInches(viewModel.FilterBankAFilterHeight, h);
                FilterBankBStartPosition.x = filter.position.x;

                scene.add(filter);
                loopIndex++;

                //console.log(filter);
            }
        }

        startingY = 0;
        loopIndex = 0;

        for (var h = 0; h < viewModel.FilterBankBQtyFilterHigh; h++) {
            for (var w = 0; w < viewModel.FilterBankBQtyFilterWide; w++) {
                var filter = filterBanks.filterBankB[loopIndex];

                filter.scale.x = getModelScaleByInches(viewModel.FilterBankBFilterWidth);
                filter.scale.y = getModelScaleByInches(viewModel.FilterBankBFilterHeight);

                if (w === 0) {

                    filter.position.x = FilterBankBStartPosition.x
                        + getModelLengthByInches(viewModel.FilterBankAFilterWidth, w);
                } else {
                    filter.position.x = FilterBankBStartPosition.x
                        + getModelLengthByInches(viewModel.FilterBankBFilterWidth, w + 0.2);
                }

                if (h === 0) {
                    if (w === 0) {
                        startingY = FilterBankBStartPosition.y
                            - (2 - getModelLengthByInches(viewModel.FilterBankBFilterHeight, 0));
                    }

                    filter.position.y = startingY;
                }
                else {
                    filter.position.y = startingY + getModelLengthByInches(viewModel.FilterBankBFilterHeight, h - 1);
                }

                FilterBankBStartPosition.y = startingY + getModelLengthByInches(viewModel.FilterBankBFilterHeight, h);

                scene.add(filter);
                loopIndex++;

                //console.log(filter);
            }
        }

        startingY = 0;
        loopIndex = 0;

        for (var h = 0; h < viewModel.FilterBankCQtyFilterHigh; h++) {
            for (var w = 0; w < viewModel.FilterBankCQtyFilterWide; w++) {
                var filter = filterBanks.filterBankC[loopIndex];

                filter.scale.x = getModelScaleByInches(viewModel.FilterBankCFilterWidth);
                filter.scale.y = getModelScaleByInches(viewModel.FilterBankCFilterHeight);

                filter.position.x = filterBankLowerLeftCoordinates.x
                    + getModelLengthByInches(viewModel.FilterBankCFilterWidth, w - 1);

                if (h === 0) {
                    if (w === 0) {
                        if (viewModel.FilterBankBQtyFilterHigh > 0 && viewModel.FilterBankBQtyFilterWide > 0) {
                            //include the offset of the previous bank
                            startingY = nextFilterBankStartPosition.y
                                - getModelOffsetByInches(viewModel.FilterBankCFilterHeight)
                                + getModelOffsetByInches(viewModel.FilterBankBFilterHeight);
                        }
                        else {
                            startingY = nextFilterBankStartPosition.y
                                - (2 - getModelLengthByInches(viewModel.FilterBankCFilterHeight, 0));
                        }
                    }

                    filter.position.y = startingY;
                }
                else {
                    filter.position.y = startingY
                        + getModelLengthByInches(viewModel.FilterBankCFilterHeight, h - 1);
                }

                scene.add(filter);
                loopIndex++;

                if (filter.position.y - filterBankLowerLeftCoordinates.y > viewModel.FilterBankHeight) {
                    alert('There is an error processing your request.\Please try different input settings.');
                }

                //console.log(filter);
            }
        }
    }

    function init() {
        canvas = $('#canvas');
        camera = new THREE.PerspectiveCamera(20, canvas.width() / canvas.height(), 0.1, 20000);
        camera.position.set(0, 0, 36);
        camera.lookAt(new THREE.Vector3(0, 3, 0));
        scene = new THREE.Scene();
        clock = new THREE.Clock();

        scene.background = new THREE.Color(0x77cb74);

        // loading manager
        var loadingManager = new THREE.LoadingManager(function () {
            scene.add(enclosure);

            addFiltersToScene();

            console.log('model loading complete');

            //console.log(camera.position);
            //console.log(enclosure);
            //$('.loader-holder').hide();
        });

        // collada
        loader = new THREE.ColladaLoader(loadingManager);

        loader.load(WEBSITE_BASE_URI + '/js/3d/models/filter-bank/model.dae', function (collada) {
            enclosure = collada.scene;

            ////these are returned length x width recommendations
            //enclosure.position.x = getEnclosurePositionX(viewModel.FilterBankWidth);
            //enclosure.position.y = getEnclosurePositionY(viewModel.FilterBankHeight);

            //these are what the user entered for length x width
            enclosure.position.x = getEnclosurePositionX(inputModel.MaximumBankWidth);
            enclosure.position.y = getEnclosurePositionY(inputModel.MaximumBankHeight);

            enclosure.scale.x = enclosure.position.y * .1;
            enclosure.scale.y = .4;
            enclosure.scale.z = -(enclosure.position.x * .067);

            enclosure.rotation.y = (Math.PI / 2);
            enclosure.rotation.x = -(Math.PI / 2);
        });

        defineFilterBanks();

        //
        var ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xcccccc, 0.6);
        directionalLight.position.set(1, 1, 0).normalize();
        scene.add(directionalLight);

        //
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(canvas.width(), canvas.height());
        canvas.append(renderer.domElement);
        //console.log(canvas.width());
        //console.log(canvas.height());
        //
        stats = new Stats();
        //canvas.append(stats.dom);

        // controls
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 0.1;
        controls.maxDistance = 2000;

        //
        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        camera.aspect = canvas.width() / canvas.height();
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.width(), canvas.height());
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }

    function render() {
        ////var delta = clock.getDelta();
        //if (ahu !== undefined) {
        ////enclosure.rotation.z += delta * 0.5;

        //var box = new THREE.Box3().setFromObject(ahu)
        //var boundingBoxSize = box.max.sub(box.min);
        //var height = boundingBoxSize.y;
        //}

        renderer.render(scene, camera);
    }

    return {
        initialize: function () {
              //init();
              //animate();

            setTimeout(function () {
                WEBSITE_BASE_URI = $("#websiteBaseUrl").val();
                API_BASE_URI = $("#filterServiceApiBaseUri").val();
                initialized = true;
                init();
                animate();
                configureFilterBanks();
            }, 100);
        },

        generateView: function () {
            if (!initialized) {
                alert('threeDimensionalControllerModule.initialize() must be called prior to model generation.');
            }
            else {
                configureFilterBanks();
            }
        }
    }

})();