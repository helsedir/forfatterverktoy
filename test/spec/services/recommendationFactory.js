'use strict';
describe('Service: recommendationFactory', function () {
    var apiUrl = 'http://localhost:50500/api/v1/';
    var mockRecommendationResource;
    var $httpBackend;
    beforeEach(angular.mock.module('webUiApp'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            mockRecommendationResource = $injector.get('Recommendation');
        });
    });

    describe('updateRecommendation', function () {
        it('should update recommendation object on update', inject(function (Recommendation) {
            Recommendation.recommendation = {
                recommendationId: 1,
                heading: 'hallo'
            }
            var recommendationToUpdate = {
                recommendationId: 1,
                heading: 'hei'
            };
            $httpBackend.expectPUT(apiUrl+'recommendations/1').respond({
                recommendationId: 1,
                heading: 'hei'
            });

            expect(Recommendation.recommendation.heading).toEqual('hallo');

            Recommendation.updateRecommendation(recommendationToUpdate).then(function () {
                expect(Recommendation.recommendation.heading).toEqual('hei');
            })
            $httpBackend.flush();
        }));
    });

    describe('getRecommendation', function () {
        it('should update recommendation object on get', inject(function (Recommendation) {
            $httpBackend.expectGET(apiUrl+'recommendations/1').respond({
                recommendationId: 1,
                heading: 'hei'
            });
            expect(Recommendation.recommendation.recommendationId).toBeUndefined();

            Recommendation.getRecommendation(1).then(function () {
                expect(Recommendation.recommendation.recommendationId).toBeDefined();
            })

            $httpBackend.flush();
        }));
    });

    describe('deleteRecommendation', function () {
        it('should remove recommendation object on delete', inject(function (Recommendation) {
            $httpBackend.expectDELETE(apiUrl+'recommendations/1').respond({});
            Recommendation.recommendation = {
                recommendationId: 1
            };

            var recommendationToDelete = {recommendationId: 1};

            expect(Recommendation.recommendation.recommendationId).toBeDefined();
            Recommendation.deleteRecommendation(recommendationToDelete).then(function () {
                expect(Recommendation.recommendation.recommendationId).toBeUndefined();
            });

            $httpBackend.flush();
        }));
    });

    describe('addPico', function () {
        it('should add pico to array of picos', inject(function (Recommendation) {
            $httpBackend.expectPOST(apiUrl+'recommendations/1/picos').respond({picoId: 1});
            Recommendation.recommendation = {
                recommendationId: 1,
                picos: []
            };
            var picoToAdd = {
                picoId: 1
            };

            expect(Recommendation.recommendation.picos.length).toBe(0);
            Recommendation.addPico(1, picoToAdd).then(function () {
                expect(Recommendation.recommendation.picos.length).toBe(1);
            });

            $httpBackend.flush();
        }));
    });

    describe('deletePico', function () {
       it('should remove pico from array of picos', inject (function (Recommendation) {
           $httpBackend.expectDELETE(apiUrl+'picos/1').respond({});
           Recommendation.recommendation = {
               recommendationId: 1,
               picos: [{picoId: 1},{picoId: 2}]
           };
           var picoToDelete = {
               picoId: 1
           };

           expect(Recommendation.recommendation.picos.length).toBe(2);
           Recommendation.deletePico(picoToDelete).then(function () {
               expect(Recommendation.recommendation.picos.length).toBe(1);
           });
           $httpBackend.flush();

       }));
    });

    describe('addEmrInfo', function () {
        it('should add emrInfo to array of emrInfos', inject(function (Recommendation) {
            $httpBackend.expectPOST(apiUrl+'recommendations/1/emrinfos').respond({emrInfoId: 1});
            Recommendation.recommendation = {
                recommendationId: 1,
                emrInfos: []
            };
            var emrInfoToAdd = {
                emrInfoId: 1
            };

            expect(Recommendation.recommendation.emrInfos.length).toBe(0);
            Recommendation.addEmrInfo(1, emrInfoToAdd).then(function () {
                expect(Recommendation.recommendation.emrInfos.length).toBe(1);
            });

            $httpBackend.flush();
        }));
    });

    describe('deleteemrInfo', function () {
        it('should remove emrInfo from array of emrInfos', inject (function (Recommendation) {
            $httpBackend.expectDELETE(apiUrl+'emrinfos/1').respond({});
            Recommendation.recommendation = {
                recommendationId: 1,
                emrInfos: [{emrInfoId: 1},{emrInfoId: 2}]
            };
            var emrInfoToDelete = {
                emrInfoId: 1
            };

            expect(Recommendation.recommendation.emrInfos.length).toBe(2);
            Recommendation.deleteEmrInfo(emrInfoToDelete).then(function () {
               expect(Recommendation.recommendation.emrInfos.length).toBe(1);
            });

            $httpBackend.flush();

        }));
    });

    describe('addEmrInfo', function () {
        it('should add keyInfo to array of keyInfos', inject(function (Recommendation) {
            $httpBackend.expectPOST(apiUrl+'recommendations/1/keyinfo').respond({keyInfoId: 1});
            Recommendation.recommendation = {
                recommendationId: 1,
                keyInfos: []
            };
            var keyInfoToAdd = {
                keyInfoId: 1
            };

            expect(Recommendation.recommendation.keyInfos.length).toBe(0);
            Recommendation.addKeyInfo(1, keyInfoToAdd).then(function () {
                expect(Recommendation.recommendation.keyInfos.length).toBe(1);
            });

            $httpBackend.flush();
        }));
    });

    describe('deletekeyInfo', function () {
        it('should remove keyInfo from array of keyInfos', inject (function (Recommendation) {
            $httpBackend.expectDELETE(apiUrl+'keyinfos/1').respond({});
            Recommendation.recommendation = {
                recommendationId: 1,
                keyInfos: [{keyInfoId: 1},{keyInfoId: 2}]
            };
            var keyInfoToDelete = {
                keyInfoId: 1
            };

            expect(Recommendation.recommendation.keyInfos.length).toBe(2);
            Recommendation.deleteKeyInfo(keyInfoToDelete).then(function () {
                expect(Recommendation.recommendation.keyInfos.length).toBe(1);
            });

            $httpBackend.flush();

        }));
    });

    describe('addReference', function () {
        it('should add reference to list of references', inject(function (Recommendation) {
            $httpBackend.expectPUT(apiUrl+'recommendations/1/references/1').respond({keyInfoId: 1});
            Recommendation.recommendation = {
                recommendationId: 1,
                references: []
            };
            var referenceToAdd = {
                referenceId: 1
            };

            expect(Recommendation.recommendation.references.length).toBe(0);
            Recommendation.addReference(referenceToAdd).then(function () {
                expect(Recommendation.recommendation.references.length).toBe(1);
            });

            $httpBackend.flush();
        }));
    });

    describe('removeReference', function () {
        it('should remove reference from list of references', inject(function (Recommendation) {
            $httpBackend.expectDELETE(apiUrl+'recommendations/1/references/1').respond({referenceId: 1});
            Recommendation.recommendation = {
                recommendationId: 1,
                references: [{referenceId:1}]
            };
            var referenceToDelete = {
                referenceId: 1
            };

            expect(Recommendation.recommendation.references.length).toBe(1);
            Recommendation.removeReference(referenceToDelete.referenceId).then(function () {
                expect(Recommendation.recommendation.references.length).toBe(0);
            });
            $httpBackend.flush();

        }));
    });

    describe('publish', function () {
        it('should update publishedStage', inject(function (Recommendation) {
            Recommendation.recommendation = {
                recommendationId: 1,
                publishedStage: 1
            }

            expect(Recommendation.recommendation.publishedStage).toEqual(1);
            $httpBackend.expectPUT(apiUrl+'recommendations/1/publish?publishedStage=2').respond({});
            Recommendation.publish(1, 2).then(function () {
                expect(Recommendation.recommendation.publishedStage).toEqual(2);
            });

            $httpBackend.flush();
        }));
    });
});