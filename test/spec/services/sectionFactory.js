'use strict';
describe('Service: sectionFactory', function () {
    var apiUrl = 'http://localhost:50500/api/v1/';
    var mockSectionResource;
    var $httpBackend;

    beforeEach(angular.mock.module('webUiApp'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            mockSectionResource = $injector.get('Section');
        });
    });

    describe('getSection', function () {
        it('should not be defined upon instantiation', inject(function (Section) {
            expect(Section.section.sectionId).toBeUndefined();
        }));
        it('should set the section object', inject(function (Section) {
            $httpBackend.expectGET(apiUrl+'sections/1')
                .respond({
                    sectionId: 1
                });

            mockSectionResource.getSection(1).then(function () {
                expect(Section.section.sectionId).toBe(1);
            });
            $httpBackend.flush();

        }));
    });

    describe('createSection', function () {
        it('should update section object on creation', inject(function (Section) {
            var section = {
                "title": "sample string 2",
                "shortTitle": "sample string 5",
                "englishTitle": "sample string 6"
            };

            $httpBackend.expectPOST(apiUrl+'sections').respond(
                {
                    "sectionId": 1,
                    "title": "sample string 2",
                    "shortTitle": "sample string 5",
                    "englishTitle": "sample string 6"
                }
            );

            mockSectionResource.createSection(section).then(function () {
                expect(Section.section.title).toEqual('sample string 2');
            })
            $httpBackend.flush();
        }));
    });

    describe('deleteSection', function () {
        it('should clear section object', inject(function (Section) {
            Section.section = {sectionId: 1};
            var sectionToDelete = {
                sectionId: 1
            };
            expect(Section.section).toBeDefined();

            $httpBackend.expectDELETE(apiUrl+'sections/1')
                .respond({
                    sectionId: 1
                });

            mockSectionResource.deleteSection(sectionToDelete).then(function () {
                expect(Section.section.sectionId).toBeUndefined();
            });
            $httpBackend.flush();

        }));

        it('should remove childsection from array of childsections', inject(function (Section) {
            Section.section = {
                sectionId: 1,
                childSections: [
                    {sectionId: 2},
                    {sectionId: 3}
                ]
            };
            $httpBackend.expectDELETE(apiUrl+'sections/2')
                .respond({
                    sectionId: 1
                });
            var sectionToDelete = {sectionId: 2};

            expect(Section.section.childSections.length).toBe(2);

            mockSectionResource.deleteSection(sectionToDelete, 0).then(function () {
                expect(Section.section.childSections.length).toBe(1);
            });

            $httpBackend.flush();
        }))
    });

    describe('updateSection', function () {
        it('should update section object on update', inject(function (Section) {
                Section.section = {
                    sectionId: 1,
                    "title": "spedbarn"
                };
                expect(Section.section.title).toEqual('spedbarn');

                $httpBackend.expectPUT(apiUrl+'sections/1').respond({
                    sectionId: 1,
                    "title": "rus"
                });

                var section = {
                    sectionId: 1,
                    "title": "rus"
                };

                mockSectionResource.updateSection(section).then(function () {
                    expect(Section.section.title).toEqual('rus');
                });

                $httpBackend.flush();
        }));
    });

    describe('addSection', function () {
       it('should add a section', inject (function (Section) {
               Section.section = {
                   sectionId: 1,
                   "title": "spedbarn",
                   childSections: []
               };

               var sectionToAdd = {
                   "heading":"sample heading",
                   "text":"sample text"
               }

               $httpBackend.expectPOST(apiUrl+'sections/1/sections').respond({
                   "heading":"sample heading2",
                   "text":"sample text"
               });

               expect(Section.section.childSections.length).toEqual(0);
               mockSectionResource.addSection(1, sectionToAdd).then(function () {
                   expect(Section.section.heading).toEqual('sample heading2');
               })
               $httpBackend.flush();
       }));
    });

    describe('addRecommendation', function () {
        it('should add recommendation to array of recommendations', inject(function (Section) {
            Section.section = {
                sectionId: 1,
                recommendations: []
            };
            var recommendationToAdd = {
                recommendationId: 1
            };

            $httpBackend.expectPOST(apiUrl + 'sections/1/recommendations').respond({
                recommendationId: 1
            });

            mockSectionResource.addRecommendation(1, recommendationToAdd).then(function () {
                expect(Section.section.recommendations.length).toBe(1);
            });
            $httpBackend.flush();
        }));
    });

    describe('deleteRecommendation', function () {
        it('should remove recommendation from array of recommendations', inject(function (Section) {
            Section.section = {
                sectionId: 1,
                recommendations: [
                    {recommendationId: 1},
                    {recommendationId: 2}
                ]
            };

            var recommendationToDelete = {
                recommendationId: 2
            };
            expect(Section.section.recommendations[1]).toBeDefined();
            $httpBackend.expectDELETE(apiUrl+'recommendations/2').respond({});

            mockSectionResource.deleteRecommendation(recommendationToDelete, 1).then(function () {
                expect(Section.section.recommendations[1]).toBeUndefined();
            });

            $httpBackend.flush();
        }));
    });


});