'use strict';
describe('guidelineFactory', function () {
    var apiUrl = 'http://localhost:50500/api/v1/';
    var mockGuidelineResource;
    var $httpBackend;
    beforeEach(angular.mock.module('webUiApp'));

    beforeEach(function () {
       angular.mock.inject(function ($injector) {
           $httpBackend = $injector.get('$httpBackend');
           mockGuidelineResource = $injector.get('Guideline');
       });
    });

    describe('getGuideline', function () {
        it('should not be defined upon instantiation', inject(function (Guideline) {
            expect(Guideline.guideline).toBeUndefined();
        }));
        it('should set the guideline object', inject(function (Guideline) {
            $httpBackend.expectGET(apiUrl+'guidelines/1')
                .respond({
                    guidelineId: 1
                });

            mockGuidelineResource.getGuideline(1).then(function () {
                expect(Guideline.guideline.guidelineId).toBe(1);
            });
            $httpBackend.flush();

        }));
    });

    describe('getGuidelines', function () {
        it('should not be defined upon instantiation', inject(function (Guideline) {
            expect(Guideline.guidelines.length).toBe(0);
        }));

        it('should populate the guidelines array', inject(function (Guideline) {
            $httpBackend.expectGET(apiUrl+'guidelines')
                .respond([
                    {guidelineId: 1}, {guidelineId: 2}]
                );

            mockGuidelineResource.getGuidelines().then(function () {
                expect(Guideline.guidelines.length).toBe(2);
                expect(Guideline.guidelines[0].guidelineId).toBe(1);
                expect(Guideline.guidelines[1].guidelineId).toBe(2);
            });

            $httpBackend.flush();
        }));
    });

    describe('deleteGuideline', function () {

        it('should delete a single guideline', inject(function (Guideline) {
            Guideline.guideline = {guidelineId: 1};
            expect(Guideline.guideline).toBeDefined();

            $httpBackend.expectDELETE(apiUrl+'guidelines/1')
                .respond({
                    guidelineId: 1
                });

            mockGuidelineResource.deleteGuideline(1).then(function () {
                expect(Guideline.guideline.guidelineId).toBeUndefined();
            });
            $httpBackend.flush();

        }));

        it('should remove guideline from array of guidelines', inject(function (Guideline) {
            var guideline1 = {guidelineId: 1};
            var guideline2 = {guidelineId: 2};
            Guideline.guideline = {guidelineId: 1};
            Guideline.guidelines.push(guideline1);
            Guideline.guidelines.push(guideline2);

            $httpBackend.expectDELETE(apiUrl+'guidelines/2')
                .respond({
                    guidelineId: 1
                });

            mockGuidelineResource.deleteGuideline(2,1).then(function () {
                expect(Guideline.guidelines[1]).toBeUndefined();
            });
            $httpBackend.flush();
        }));
    });

    describe('saveGuideline', function () {
        it('should update the guideline object on save', inject(function (Guideline) {
            var guideline = {
                "title": "sample string 2",
                "shortTitle": "sample string 5",
                "englishTitle": "sample string 6"
            };

            $httpBackend.expectPOST(apiUrl+'guidelines').respond(
                {
                    "guidelineId": 1,
                    "title": "sample string 2",
                    "shortTitle": "sample string 5",
                    "englishTitle": "sample string 6"
                }
            );

            mockGuidelineResource.saveGuideline(guideline).then(function () {
                expect(Guideline.guideline.title).toEqual('sample string 2');
            })
            $httpBackend.flush();

        }));
    });

    describe('updateGuideline', function () {
        it('should update the guideline object on update', inject(function (Guideline) {


            Guideline.guideline = {
                guidelineId: 1,
                "title": "spedbarn"
            };
            expect(Guideline.guideline.title).toEqual('spedbarn');

            $httpBackend.expectPUT(apiUrl+'guidelines/1').respond({
                guidelineId: 1,
                    "title": "rus"
            });

            var guideline = {
                guidelineId: 1,
                "title": "rus"
            };

            mockGuidelineResource.updateGuideline(guideline).then(function () {
                expect(Guideline.guideline.title).toEqual('rus');
            })

            $httpBackend.flush();
        }))
    });

    describe('addSection', function () {
        it('should add a section', inject(function (Guideline) {
            Guideline.guideline = {
                guidelineId: 1,
                "title": "spedbarn",
                sections: []
            };

            var section = {
                "heading":"sample heading",
                "text":"sample text"
            }

            $httpBackend.expectPOST(apiUrl+'guidelines/1/sections').respond({
                "heading":"sample heading",
                "text":"sample text"
            });

            expect(Guideline.guideline.sections.length).toEqual(0);
            mockGuidelineResource.addSection(1, section).then(function () {
                expect(Guideline.guideline.sections.length).toEqual(1);
            })
            $httpBackend.flush();
        }));
    });

    describe('deleteSection', function () {
        it('should remove section from array of sections', inject(function (Guideline) {
            Guideline.guideline = {
                guidelineId: 1,
                "title": "spedbarn",
                sections: [
                    {
                        sectionId: 1,
                        "heading":"sample heading",
                        "text":"sample text"
                    },
                    {
                        sectionId: 2,
                        "heading":"sample heading",
                        "text":"sample text"
                    }]
            };
            var sectionToDelete = {
                sectionId: 2,
                "heading":"sample heading",
                "text":"sample text"
            };
            expect(Guideline.guideline.sections[1]).toBeDefined();
            $httpBackend.expectDELETE(apiUrl+'sections/2').respond({});

            mockGuidelineResource.deleteSection(sectionToDelete, 1).then(function () {
                expect(Guideline.guideline.sections[1]).toBeUndefined();
            });

            $httpBackend.flush();
        }));
    })
});