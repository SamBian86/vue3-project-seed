<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="160"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-divider content-position="left">{{ $t('PensionResident.baseInfo') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.communityCode')" prop="communityCode">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.communityCode"
            :placeholder="$t('PensionResident.communityCodePlaceHolder')"
            @change="communityChangeHandle"
            filterable
            clearable
          >
            <el-option v-for="item in sysCommunityListAll" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.buildingId')" prop="buildingId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.buildingId"
            :placeholder="$t('PensionResident.buildingIdPlaceHolder')"
            @change="buildingChangeHandle"
            filterable
            clearable
          >
            <el-option
              v-for="item in pensionBuildingListAll"
              :key="item.id"
              :label="item.buildingNumber"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.familyId')" prop="resident.familyId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.familyId"
            :placeholder="$t('PensionResident.familyIdPlaceHolder')"
            filterable
            clearable
          >
            <el-option v-for="item in pensionFamilyListAll" :key="item.id" :label="item.roomNumber" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.name')" prop="resident.name">
          <el-input v-model="formData.resident.name" :placeholder="$t('PensionResident.namePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.anotherName')" prop="anotherName">
          <el-input v-model="formData.resident.anotherName" :placeholder="$t('PensionResident.anotherNamePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.houseType')" prop="houseType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.houseType"
            :placeholder="$t('PensionResident.houseTypePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('residentrelationship')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.sex')" prop="resident.sex">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.sex"
            :placeholder="$t('PensionResident.sexPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('sex')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.nation')" prop="nation">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.nation"
            :placeholder="$t('PensionResident.nationPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('ethnic')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.education')" prop="education">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.education"
            :placeholder="$t('PensionResident.educationPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('education')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.idCard')" prop="resident.idCard">
          <el-input v-model="formData.resident.idCard" :placeholder="$t('PensionResident.idCardPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.nativePlace')" prop="nativePlace">
          <el-input
            v-model="formData.resident.nativePlace"
            :placeholder="$t('PensionResident.nativePlacePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.religion')" prop="religion">
          <el-input v-model="formData.resident.religion" :placeholder="$t('PensionResident.religionPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.phoneNumber')" prop="resident.phoneNumber">
          <el-input v-model="formData.resident.phoneNumber" :placeholder="$t('PensionResident.phoneNumberPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.fixPhone')" prop="fixPhone">
          <el-input v-model="formData.resident.fixPhone" :placeholder="$t('PensionResident.fixPhonePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.politicsStatus')" prop="politicsStatus">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.politicsStatus"
            :placeholder="$t('PensionResident.politicsStatusPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('politicsStatus')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.householdAddressStreetName')" prop="householdAddressStreetName">
          <CascaderItem
            ref="cascaderItem"
            :show-text="formData.resident.householdAddressStreetName"
            :data-method="getSysAddressHandle"
            :lazy="true"
            :disabled="pageType === 'detail'"
            :placeholder="$t('PensionResident.householdAddressStreetNamePlaceHolder')"
            @cascader-change-handle="cascaderChangeHandle"
          ></CascaderItem>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.householdAddressVillage')" prop="householdAddressVillage">
          <el-input v-model="formData.resident.householdAddressVillage" :placeholder="$t('PensionResident.householdAddressVillagePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.householdFullAddress')" prop="householdFullAddress">
          <el-input v-model="formData.resident.householdFullAddress" :placeholder="$t('PensionResident.householdFullAddressPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.married')" prop="married">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.married"
            :placeholder="$t('PensionResident.marriedPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('maritalstatus')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.residentCharacter')" prop="residentCharacter">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.residentCharacter"
            :placeholder="$t('PensionResident.residentCharacterPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('character')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.childrenNum')" prop="childrenNum">
          <el-input v-model="formData.resident.childrenNum" :placeholder="$t('PensionResident.childrenNumPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.retired')" prop="retired">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.retired"
            :placeholder="$t('PensionResident.retiredPlaceHolder')"
            filterable
            clearable
          >
            <el-option v-for="item in retiredSelectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.professional')" prop="professional">
          <el-input v-model="formData.resident.professional" :placeholder="$t('PensionResident.professionalPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.retiredTime')" prop="retiredTime">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.retiredTime"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="date"
            :placeholder="$t('PensionResident.retiredTimePlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.hobby')" prop="hobby">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.hobby"
            :placeholder="$t('PensionResident.hobbyPlaceHolder')"
            filterable
            clearable
            multiple
          >
            <el-option
              v-for="item in getDictByType('hobby')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.specialty')" prop="specialty">
          <el-input v-model="formData.resident.specialty" :placeholder="$t('PensionResident.specialtyPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.economicSource')" prop="economicSource">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.economicSource"
            :placeholder="$t('PensionResident.economicSourcePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('economicSource')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.birthday')" prop="birthday">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.birthday"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="date"
            :placeholder="$t('PensionResident.birthdayPlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.lunarBirthday')" prop="lunarBirthday">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.lunarBirthday"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="date"
            :placeholder="$t('PensionResident.lunarBirthdayPlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8"></el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.headPhoto')" prop="headPhoto">
          <UploadFile
            ref="uploadFile"
            :type="'one'"
            :items="images"
            :style-text="'width: 300px'"
            :disabled="pageType === 'detail'"
            @success-callback="uploadSuccessHandle"
          ></UploadFile>
        </el-form-item>
      </el-col>

      <el-divider content-position="left">{{ $t('PensionResident.personalInfo') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.petInfo')" prop="petInfo">
          <el-input v-model="formData.resident.petInfo" :placeholder="$t('PensionResident.petInfoPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.avoidFood')" prop="avoidFood">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.avoidFood"
            :placeholder="$t('PensionResident.avoidFoodPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('avoidFood')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.allergy')" prop="allergy">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.allergy"
            :placeholder="$t('PensionResident.allergyPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('allergy')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.siesta')" prop="siesta">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.siesta"
            :placeholder="$t('PensionResident.siestaPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('siesta')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.acceptVoluntaryService')" prop="acceptVoluntaryService">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.acceptVoluntaryService"
            :placeholder="$t('PensionResident.acceptVoluntaryServicePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('acceptVoluntaryService')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.voluntaryService')" prop="voluntaryService">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.voluntaryService"
            :placeholder="$t('PensionResident.voluntaryServicePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('voluntaryService')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.pensionPlans')" prop="pensionPlans">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.pensionPlans"
            :placeholder="$t('PensionResident.pensionPlansPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('pensionPlans')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.serviceDemand')" prop="serviceDemand">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.serviceDemand"
            :placeholder="$t('PensionResident.serviceDemandPlaceHolder')"
            filterable
            clearable
            multiple
          >
            <el-option
              v-for="item in getDictByType('serviceDemand')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8"></el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.remark')" prop="remark">
          <el-input type="textarea" :rows="4" v-model="formData.resident.remark" :placeholder="$t('PensionResident.remarkPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>

      <el-divider content-position="left">{{ $t('PensionResident.liveInfo') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.residenceStatus')" prop="residenceStatus">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.residenceStatus"
            :placeholder="$t('PensionResident.residenceStatusPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('residenceStatus')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.pensionMethod')" prop="pensionMethod">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.pensionMethod"
            :placeholder="$t('PensionResident.pensionMethodPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('pensionMethod')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.oldType')" prop="oldType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.oldType"
            :placeholder="$t('PensionResident.oldTypePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('oldType')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-divider content-position="left">{{ $t('PensionResident.subsidyInfo') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.compensation')" prop="compensation">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.compensation"
            :placeholder="$t('PensionResident.compensationPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('compensation')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.subsidies')" prop="subsidies">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.subsidies"
            :placeholder="$t('PensionResident.subsidiesPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('subsidies')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.allowances')" prop="allowances">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.resident.allowances"
            :placeholder="$t('PensionResident.allowancesPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('allowances')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-divider content-position="left">{{ $t('PensionResident.healthInfo') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.height')" prop="height">
          <el-input v-model="formData.residentHealth.height" :placeholder="$t('PensionResident.heightPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.weight')" prop="weight">
          <el-input v-model="formData.residentHealth.weight" :placeholder="$t('PensionResident.weightPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.geneticHistory')" prop="geneticHistory">
          <el-input v-model="formData.residentHealth.geneticHistory" :placeholder="$t('PensionResident.geneticHistoryPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.anamnesis')" prop="anamnesis">
          <el-input type="textarea" :rows="4" v-model="formData.residentHealth.anamnesis" :placeholder="$t('PensionResident.anamnesisPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.drugAllergyHistory')" prop="drugAllergyHistory">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.residentHealth.drugAllergyHistory"
            :placeholder="$t('PensionResident.drugAllergyHistoryPlaceHolder')"
            filterable
            clearable
            multiple
          >
            <el-option
              v-for="item in getDictByType('drugAllergyHistory')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.familyMedicalHistory')" prop="familyMedicalHistory">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.residentHealth.familyMedicalHistory"
            :placeholder="$t('PensionResident.familyMedicalHistoryPlaceHolder')"
            filterable
            clearable
            multiple
          >
            <el-option
              v-for="item in getDictByType('familyMedicalHistory')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.chronicDisease')" prop="chronicDisease">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.residentHealth.chronicDisease"
            :placeholder="$t('PensionResident.chronicDiseasePlaceHolder')"
            filterable
            clearable
            multiple
          >
            <el-option
              v-for="item in getDictByType('chronicDisease')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictLabel"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.physicalStatus')" prop="physicalStatus">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.residentHealth.physicalStatus"
            :placeholder="$t('PensionResident.physicalStatusPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('physicalStatus')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.bloodType')" prop="bloodType">
          <el-input v-model="formData.residentHealth.bloodType" :placeholder="$t('PensionResident.bloodTypePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.sleepQuality')" prop="sleepQuality">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.residentHealth.sleepQuality"
            :placeholder="$t('PensionResident.sleepQualityPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('sleepQuality')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.healthProblems')" prop="healthProblems">
          <el-input v-model="formData.residentHealth.healthProblems" :placeholder="$t('PensionResident.healthProblemsPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.disabilitySituation')" prop="disabilitySituation">
          <el-input v-model="formData.residentHealth.disabilitySituation" :placeholder="$t('PensionResident.disabilitySituationPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="8" :lg="8" :xl="8">
        <el-form-item :label="$t('PensionResident.payMethod')" prop="payMethod">
          <el-input v-model="formData.residentHealth.payMethod" :placeholder="$t('PensionResident.payMethodPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionResident.physicalFrequency')" prop="physicalFrequency">
          <el-input v-model="formData.residentHealth.physicalFrequency" :placeholder="$t('PensionResident.physicalFrequencyPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionResident.existingDisease')" prop="existingDisease">
          <el-input type="textarea" :rows="4" v-model="formData.residentHealth.existingDisease" :placeholder="$t('PensionResident.existingDiseasePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionResident.painPosition')" prop="painPosition">
          <el-input type="textarea" :rows="4" v-model="formData.residentHealth.painPosition" :placeholder="$t('PensionResident.painPositionPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionResident.functionalStatus')" prop="functionalStatus">
          <el-input type="textarea" :rows="4" v-model="formData.residentHealth.functionalStatus" :placeholder="$t('PensionResident.functionalStatusPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionResident.hospitalSituation')" prop="hospitalSituation">
          <el-input type="textarea" :rows="4" v-model="formData.residentHealth.hospitalSituation" :placeholder="$t('PensionResident.hospitalSituationPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionResident.operationSituation')" prop="operationSituation">
          <el-input type="textarea" :rows="4" v-model="formData.residentHealth.operationSituation" :placeholder="$t('PensionResident.operationSituationPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionResident.medicineContent')" prop="medicineContent">
          <el-input type="textarea" :rows="4" v-model="formData.residentHealth.medicineContent" :placeholder="$t('PensionResident.medicineContentPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>

      <el-divider content-position="left">{{ $t('PensionResident.familyInfo') }}</el-divider>
      <template v-for="(item, index) in formData.residentRelationList" :key="index">
        <el-col :span="8">
          <el-form-item :label="$t('PensionResident.residentRelationList.name')" :prop="`residentRelationList.${index}.name`">
            <el-input style="width:100%" v-model="item.name" :placeholder="$t('PensionResident.residentRelationList.namePlaceHolder')" clearable>
              <template v-if="formData.residentRelationList.length - 1 === index" #append>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeResidentRelationHandle(index)">{{$t('PensionResident.delete')}}</el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('PensionResident.residentRelationList.sex')" :prop="`residentRelationList.${index}.sex`">
            <el-select
              class="el-select-block"
              :size="StyleEnum.FORM_SIZE"
              v-model="item.sex"
              :placeholder="$t('PensionResident.residentRelationList.sexPlaceHolder')"
              filterable
              clearable
            >
              <el-option
                v-for="item in getDictByType('sex')"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('PensionResident.address')" prop="address">
            <el-input style="width:100%" v-model="item.address" :placeholder="$t('PensionResident.addressPlaceHolder')" clearable></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('PensionResident.residentRelationList.residentRelation')" :prop="`residentRelationList.${index}.residentRelation`">
            <el-select
              class="el-select-block"
              :size="StyleEnum.FORM_SIZE"
              v-model="item.residentRelation"
              :placeholder="$t('PensionResident.residentRelationList.residentRelationPlaceHolder')"
              filterable
              clearable
            >
              <el-option
                v-for="item in getDictByType('residentRelation')"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('PensionResident.phone')" prop="phone">
            <el-input style="width:100%" v-model="item.phone" :placeholder="$t('PensionResident.phonePlaceHolder')" clearable></el-input>
          </el-form-item>  
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('PensionResident.firstContact')" prop="firstContact">
            <el-select
              class="el-select-block"
              :size="StyleEnum.FORM_SIZE"
              v-model="item.firstContact"
              :placeholder="$t('PensionResident.firstContactPlaceHolder')"
              @change="firstContactHandle($event, index)"
              filterable
              clearable
            >
              <el-option v-for="item in firstContactOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </template>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24" style="text-align: right;">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="addResidentRelationHandle">{{$t('PensionResident.add')}}</el-button>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24"></el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24"></el-col>

      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item v-if="pageType === 'create' || pageType === 'update'">
          <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
            {{ $t('form.submit') }}
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, watch, unref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
import { mapGetters } from 'vuex'
// components
import { UploadFile } from '/@/components/UploadFile'
import { CascaderItem } from '/@/components/CascaderItem'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysAddressRepository from '/@/views/pages/sys/address/useSysAddressRepository'
import usePensionResidentRepository from './usePensionResidentRepository' // 模板修改标记
import useSysCommunityRepository from '/@/views/pages/sys/community/useSysCommunityRepository' // 模板修改标记
import usePensionBuildingRepository from '/@/views/pages/pension/building/usePensionBuildingRepository' // 模板修改标记
import usePensionFamilyRepository from '/@/views/pages/pension/family/usePensionFamilyRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionResidentForm', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile, CascaderItem },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const images = ref([])
    const pageType = ref(props.pageType)
    const pageParams = ref(props.pageParams)
    const {
      formData,
      createPensionResidentHandle,
      updatePensionResidentHandle,
      getPensionResidentByIdHandle,
      formPageResetHandle
    } = usePensionResidentRepository() // 模板修改标记
    const { sysCommunityListAll, getSysCommunityListAllHandle } = useSysCommunityRepository()
    getSysCommunityListAllHandle({ familyLocation: true })
    const { pensionBuildingListAll, getPensionBuildingListAllHandle } = usePensionBuildingRepository()
    const { pensionFamilyListAll, getPensionFamilyListAllHandle } = usePensionFamilyRepository()
    const { getSysAddressHandle } = useSysAddressRepository()
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)
    // 延迟显示方法
    const hideSkeleton = () => {
      setTimeout(() => {
        emit('hide-skeleton')
      }, StyleEnum.FORM_SKELETON_TIME)
    }

    // 显示方法
    const showSkeleton = () => {
      emit('show-skeleton')
    }

    // 其他页面打开逻辑
    if (pageParams.value.disabled) {
      if (pageType.value === 'create') {
        formPageResetHandle(hideSkeleton)
        defaultConfigHandle()

        getPensionBuildingListAllHandle({ communityCode: pageParams.value.communityCode })
        getPensionFamilyListAllHandle({ buildingId: pageParams.value.buildingId })
        formData.value.resident.communityCode = pageParams.value.communityCode
        formData.value.resident.buildingId = pageParams.value.buildingId
        formData.value.resident.familyId = pageParams.value.familyId
      }

      if (pageType.value === 'update') {
        getPensionResidentByIdHandle(unref(pageParams), hideSkeleton).then((response: any) => {

          // 需要在获取数据那里处理paddress
          // const { provinceName, cityName, areaName, streetName } = response
          // if (provinceName && cityName && areaName && streetName) {
          //   formData.value['paddress'] = `${provinceName} / ${cityName} / ${areaName} / ${streetName}`
          // }
          const { headPhoto, communityCode, buildingId } = response.resident
          if (headPhoto) {
            images.value = [{ url: headPhoto }]
          } else {
            images.value = []
          }

          getPensionBuildingListAllHandle({ communityCode })
          getPensionFamilyListAllHandle({ buildingId })
        }) // 模板修改标记
      }
    }

    onMounted(() => {
      // 监听当前组件的pageType、pageParams改变时的处理，默认先显示skeleton
      watch([() => props.pageType, () => props.pageParams], ([type, params], [prevType, prevParams]) => {
        showSkeleton()

        // console.log('already')
        // 修改变成创建
        if (type === 'create') {
          formPageResetHandle(hideSkeleton)
          defaultConfigHandle()
        }
        if (type === 'update' || type === 'detail') {
          getPensionResidentByIdHandle(params, hideSkeleton).then((response: any) => {
            const { headPhoto, communityCode, buildingId } = response.resident
            if (headPhoto) {
              images.value = [{ url: headPhoto }]
            } else {
              images.value = []
            }

            getPensionBuildingListAllHandle({ communityCode })
            getPensionFamilyListAllHandle({ buildingId })
          }) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据
    const retiredSelectOptions = ref([
      { label: '否', value: 0 },
      { label: '是', value: 1 }
    ])

    const firstContactOptions = ref([
      { label: '否', value: 0 },
      { label: '是', value: 1 }
    ])

    // 模板修改标记

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      images.value = items
      // one
      if (items.length !== 0) {
        formData.value.resident.headPhoto = items[0]['url']
      } else {
        formData.value.resident.headPhoto = ''
      }
      // many
      // if (items.length !== 0) {
      //   formData.value.bbb = items
      // }
    }
    // 校验
    const rules = ref({
      // communityCode: [{ required: true, message: t('PensionResident.communityCodePlaceHolder'), trigger: 'change' }], // 模板修改标记
      // buildingId: [{ required: true, message: t('PensionResident.buildingIdPlaceHolder'), trigger: 'change' }],
      'resident.familyId': [{ required: true, message: t('PensionResident.familyIdPlaceHolder'), trigger: 'change' }],
      // relationShip: [{ required: true, message: t('PensionResident.relationShipPlaceHolder'), trigger: 'change' }],
      'resident.name': [{ required: true, message: t('PensionResident.namePlaceHolder'), trigger: 'blur' }],
      'resident.sex': [{ required: true, message: t('PensionResident.sexPlaceHolder'), trigger: 'blur' }],
      'resident.idCard': [{ required: true, message: t('PensionResident.idCardPlaceHolder'), trigger: 'blur' }],
      'resident.phoneNumber': [
        {
          message: t('PensionResident.phoneNumberPlaceHolder'),
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            validatePhoneHandle(rule, value, callback, t)
          }
        }
      ]
    })

    // 社区变动事件
    function communityChangeHandle(value: any) {
      formData.value.resident.buildingId = ''
      formData.value.resident.familyId = ''
      if (value) {
        getPensionBuildingListAllHandle({ communityCode: value })
      } else {
        pensionBuildingListAll.value = []
        pensionFamilyListAll.value = []
      }
    }

    // 楼栋变动事件
    function buildingChangeHandle(value: any) {
      formData.value.resident.familyId = ''
      if (value) {
        getPensionFamilyListAllHandle({ buildingId: value })
      } else {
        pensionFamilyListAll.value = []
      }
    }

    // 行政区块回调处理
    function cascaderChangeHandle(data: { selected: any[]; store: Object }) {
      const { selected, store } = data
      if (selected.length === 4) {
        // formData.value['provinceCode'] = selected[0]
        // formData.value['cityCode'] = selected[1]
        // formData.value['areaCode'] = selected[2]
        // formData.value['streetCode'] = selected[3]
        // formData.value['paddress'] = `${getValue(selected[0])} / ${getValue(selected[1])} / ${getValue(selected[2])} / ${getValue(
        //   selected[3]
        // )}`
        formData.value.resident['householdAddressStreetName'] = `${getValue(selected[0])}${getValue(selected[1])}${getValue(selected[2])}${getValue(selected[3])}`
      }

      function getValue(key: any) {
        return store[key] ? store[key] : ''
      }
    }


    function removeResidentRelationHandle(index) {
      const residentRelationList = Array.from(formData.value.residentRelationList)
      const tempRules = Object.assign({}, rules.value)
      residentRelationList.splice(index, 1)
      delete tempRules[`residentRelationList.${index}.name`]
      delete tempRules[`residentRelationList.${index}.sex`]
      delete tempRules[`residentRelationList.${index}.residentRelation`]

      rules.value = tempRules
      formData.value.residentRelationList = residentRelationList
    }

    function firstContactHandle(value, index) {
      const residentRelationList = Array.from(formData.value.residentRelationList)
      if (value) {
        residentRelationList.forEach((item, idx) => {
          if (index !== idx && item.firstContact === value) {
            item.firstContact = 0
          }
        })
      }
      formData.value.residentRelationList = residentRelationList
    }

    function addResidentRelationHandle() {
      const residentRelationList = Array.from(formData.value.residentRelationList)
      const residentId = formData.value.resident.id
      const tempRules = Object.assign({}, rules.value)
      const tempResidentRelation = {
        name: '',
        sex: '',
        address: '',
        residentRelation: '',
        phone: '',
        firstContact: 0,
        residentId
      }
      residentRelationList.push(tempResidentRelation)
      const idx = residentRelationList.length - 1
      tempRules[`residentRelationList.${idx}.name`] = [{ required: true, message: t('PensionResident.residentRelationList.namePlaceHolder'), trigger: 'blur' }]
      tempRules[`residentRelationList.${idx}.sex`] = [{ required: true, message: t('PensionResident.residentRelationList.sexPlaceHolder'), trigger: 'blur' }]
      tempRules[`residentRelationList.${idx}.residentRelation`] = [{ required: true, message: t('PensionResident.residentRelationList.residentRelationPlaceHolder'), trigger: 'change' }]
      
      rules.value = tempRules
      formData.value.residentRelationList = residentRelationList
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionResidentHandle : updatePensionResidentHandle // 模板修改标记
      const cFormData = unref(formData)
      if(cFormData.resident) {
        cFormData.resident.hobby = cFormData.resident.hobby && cFormData.resident.hobby.length !== 0 ? cFormData.resident.hobby.join() : ''
        cFormData.resident.serviceDemand = cFormData.resident.serviceDemand && cFormData.resident.serviceDemand.length !== 0 ? cFormData.resident.serviceDemand.join() : ''
      }

      if (cFormData.residentHealth) {
        cFormData.residentHealth.drugAllergyHistory = cFormData.residentHealth.drugAllergyHistory && cFormData.residentHealth.drugAllergyHistory.length !== 0 ? cFormData.residentHealth.drugAllergyHistory.join() : ''
        cFormData.residentHealth.familyMedicalHistory = cFormData.residentHealth.familyMedicalHistory && cFormData.residentHealth.familyMedicalHistory.length !== 0 ? cFormData.residentHealth.familyMedicalHistory.join() : ''
        cFormData.residentHealth.chronicDisease = cFormData.residentHealth.chronicDisease && cFormData.residentHealth.chronicDisease.length !== 0 ? cFormData.residentHealth.chronicDisease.join() : ''
      }
      formPageSubmitHandle(cMethod, cFormData, () => {
        emit('update-table')
        emit('hide-dialog')
        emit('show-skeleton')
      })
    }

    return {
      // 基础支持
      StyleEnum,
      // 表单数据
      formData,
      pageType,
      pageParams,
      rules,
      images,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      uploadSuccessHandle,
      sysCommunityListAll,
      communityChangeHandle,
      buildingChangeHandle,
      pensionBuildingListAll,
      pensionFamilyListAll,
      retiredSelectOptions,
      firstContactOptions,
      cascaderChangeHandle,
      getSysAddressHandle,
      removeResidentRelationHandle,
      firstContactHandle,
      addResidentRelationHandle
    }
  }
})
</script>
